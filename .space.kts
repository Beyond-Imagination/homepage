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

                yarn
                yarn build

                cp -r out ${'$'}JB_SPACE_FILE_SHARE_PATH/out
            """
        }
    }

    container(displayName = "deploy", image = "amazon/aws-cli") {
        shellScript {
            content = """
                ls -al ${'$'}JB_SPACE_FILE_SHARE_PATH/out
                aws --version

                export AWS_ACCESS_KEY_ID="{{ project:AWS_ACCESS_KEY_ID }}"
                export AWS_SECRET_ACCESS_KEY="{{ project:AWS_SECRET_ACCESS_KEY }}"
                export AWS_DEFAULT_REGION=ap-northeast-2

                aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://beyond-imagination-dev/out
            """
        }
    }
}
