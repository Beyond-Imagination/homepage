/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Build") {
    container(displayName = "builder", image = "beyond-imagination.registry.jetbrains.space/p/b-i-homepage/containers/builder:latest") {
		shellScript {
			content = """
				echo "NEXT_PUBLIC_SPACE_ID=$NEXT_PUBLIC_SPACE_ID" >> .env
                echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=$NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN" >> .env
                echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=$NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN" >> .env
				yarn
    			yarn build
      		"""
        }
    }
}
