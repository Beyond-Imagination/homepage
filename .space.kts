job("Build and deploy") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"main"
                +"develop"
                +"test"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {
        env["SPACE_ID"] = "{{ project:NEXT_PUBLIC_SPACE_ID }}"
        env["DELIVERY_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN }}"
        env["PREVIEW_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN }}"

        shellScript {
            content = """
                echo "NEXT_PUBLIC_SPACE_ID=${'$'}SPACE_ID" >> .env
                echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_TOKEN" >> .env
                echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_TOKEN" >> .env

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_PROD }}" >> .env
                else
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_DEV }}" >> .env
                fi

                yarn
                yarn build

                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        env["AWS_ACCESS_KEY_ID"] = "{{ project:AWS_ACCESS_KEY_ID }}"
        env["AWS_SECRET_ACCESS_KEY"] = "{{ project:AWS_SECRET_ACCESS_KEY }}"

        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID=${'$'}AWS_ACCESS_KEY_ID
                export AWS_SECRET_ACCESS_KEY=${'$'}AWS_SECRET_ACCESS_KEY
                export AWS_DEFAULT_REGION=ap-northeast-2

                echo ${'$'}JB_SPACE_GIT_BRANCH

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://beyond-imagination-main/out
                    aws cloudfront create-invalidation --distribution-id E2DTRGJDB5D9Z8 --paths "/*"
                else
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://beyond-imagination-dev/out
                    aws cloudfront create-invalidation --distribution-id EO4ZCP5M2WO4J --paths "/*"
                fi
            """
        }
    }
}
