job("[FE] Merge Request") {
    startOn {
        codeReviewOpened {
            branchToCheckout = CodeReviewBranch.MERGE_REQUEST_SOURCE
        }
        gitPush {
            anyRefMatching {
                +"refs/merge/*/head"
            }
        }
    }
    parallel {
        container(displayName = "build & test", image = "node:alpine") {
            env["REVIEW_ID"] = "{{ run:review.id }}"
            env["PROJECT_ID"] = "{{ run:project.id }}"
            env["SPACE_AUTOMATION_AUTHORIZATION"] = "{{ project:SPACE_AUTOMATION_AUTHORIZATION }}"
            env["SPACE_ID"] = "{{ project:NEXT_PUBLIC_SPACE_ID }}"
            env["DELIVERY_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN }}"
            env["PREVIEW_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN }}"
            env["ENVIRONMENT"] = "{{ project:NEXT_PUBLIC_ENVIRONMENT }}"
            env["DELIVERY_ACCESS_DEV_TOKEN"] = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_DEV_TOKEN }}"
            env["PREVIEW_ACCESS_DEV_TOKEN"] = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_DEV_TOKEN }}"
            env["ENVIRONMENT_DEV"] = "{{ project:NEXT_PUBLIC_ENVIRONMENT_DEV }}"

            cache {
                // package.json의 내용을 해시를 하고 그 값을 캐싱키로 사용
                // 이를 통해 package.json이 동일하면 캐시를 사용하도록 유도하고 달라지면 캐시를 새로 만든다
                // 참고: https://www.jetbrains.com/help/space/cache-files.html#upload-and-reuse-cached-files
                storeKey = "npm-{{ hashFiles('package.json') }}"

                // Fallback 옵션인데 불필요 할것 같아서 주석처리
                /*restoreKeys {
                    +"npm-master"
                }*/

                // 캐시가 들어갈 디렉토리
                localPath = "node_modules"
            }

            shellScript {
                content = """
                echo "NEXT_PUBLIC_SPACE_ID=${'$'}SPACE_ID" >> .env.production

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_PROD }}" >> .env.production
                    echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_ENVIRONMENT=${'$'}ENVIRONMENT" >> .env.production
                else
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_DEV }}" >> .env.production
                    echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_DEV_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_DEV_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_ENVIRONMENT=${'$'}ENVIRONMENT_DEV" >> .env.production
                fi
                set -e
                if [ -z "${'$'}(ls -A node_modules)" ]; then
                    # 캐시 디렉토리가 비어있을때에만 yarn install 실행
                    yarn install
                fi
                yarn reviewer &
                yarn build
                wait
            """
            }
        }

        container(displayName = "send automation result", image = "gradle:6.1.1-jre11") {
            env["REVIEW_ID"] = "{{ run:review.id }}"
            kotlinScript { api ->
                api.space().chats.messages.sendMessage(
                    channel = ChannelIdentifier.Review(ReviewIdentifier.Id(System.getenv("REVIEW_ID"))),
                    content = ChatMessage.Text(
                        text = api.executionUrl()
                    )
                )
            }
        }
    }
}

job("[FE] Deploy") {
    startOn {
        gitPush {
            anyBranchMatching {
                +"main"
                +"develop"
            }
        }
    }

    container(displayName = "build", image = "node:alpine") {
        env["SPACE_ID"] = "{{ project:NEXT_PUBLIC_SPACE_ID }}"
        env["DELIVERY_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN }}"
        env["PREVIEW_ACCESS_TOKEN"] = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN }}"
        env["ENVIRONMENT"] = "{{ project:NEXT_PUBLIC_ENVIRONMENT }}"
        env["DELIVERY_ACCESS_DEV_TOKEN"] = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_DEV_TOKEN }}"
        env["PREVIEW_ACCESS_DEV_TOKEN"] = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_DEV_TOKEN }}"
        env["ENVIRONMENT_DEV"] = "{{ project:NEXT_PUBLIC_ENVIRONMENT_DEV }}"

        cache {
            // package.json의 내용을 해시를 하고 그 값을 캐싱키로 사용
            // 이를 통해 package.json이 동일하면 캐시를 사용하도록 유도하고 달라지면 캐시를 새로 만든다
            // 참고: https://www.jetbrains.com/help/space/cache-files.html#upload-and-reuse-cached-files
            storeKey = "npm-{{ hashFiles('package.json') }}"

            // Fallback 옵션인데 불필요 할것 같아서 주석처리
            /*restoreKeys {
                +"npm-master"
            }*/

            // 캐시가 들어갈 디렉토리
            localPath = "node_modules"
        }

        shellScript {
            content = """

                echo "NEXT_PUBLIC_SPACE_ID=${'$'}SPACE_ID" >> .env.production

                if [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/main" ]; then
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_PROD }}" >> .env.production
                    echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_ENVIRONMENT=${'$'}ENVIRONMENT" >> .env.production
                else
                    echo "NEXT_PUBLIC_NEWRELIC_AGENT_ID={{ project:NEXT_PUBLIC_NEWRELIC_AGENT_ID_DEV }}" >> .env.production
                    echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_DEV_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_DEV_TOKEN" >> .env.production
                    echo "NEXT_PUBLIC_ENVIRONMENT=${'$'}ENVIRONMENT_DEV" >> .env.production
                fi

                if [ -z "${'$'}(ls -A node_modules)" ]; then
                    # 캐시 디렉토리가 비어있을때에만 yarn install 실행
                    yarn install
                fi
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
                elif [ ${'$'}JB_SPACE_GIT_BRANCH == "refs/heads/develop" ]; then
                    aws s3 sync ${'$'}JB_SPACE_FILE_SHARE_PATH/out s3://beyond-imagination-dev/out
                    aws cloudfront create-invalidation --distribution-id EO4ZCP5M2WO4J --paths "/*"
                else
                    echo "Deployment is not supported on this branch."
                fi
            """
        }
    }
}
