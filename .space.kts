/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Build & Deploy") {
	parameters {
        secret("space-id", value = "{{ project:NEXT_PUBLIC_SPACE_ID }}")
        secret("deliver-access-token", value = "{{ project:NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN }}")
        secret("preview-access-token", value = "{{ project:NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN }}")
    }
    container(displayName = "builder", image = "beyond-imagination.registry.jetbrains.space/p/b-i-homepage/containers/builder:latest") {
		env["SPACE_ID"] = "{{ space-id }}"
      	env["DELIVER_ACCESS_TOKEN"] = "{{ deliver-access-token }}"
      	env["PREVIEW_ACCESS_TOKEN"] = "{{ preview-access-token }}"

      	shellScript {
			content = """
				echo "NEXT_PUBLIC_SPACE_ID=${'$'}SPACE_ID" >> .env
                echo "NEXT_PUBLIC_DELIVERY_ACCESS_TOKEN=${'$'}DELIVERY_ACCESS_TOKEN" >> .env
                echo "NEXT_PUBLIC_PREVIEW_ACCESS_TOKEN=${'$'}PREVIEW_ACCESS_TOKEN" >> .env
				yarn
    			yarn build
      		"""
        }
    }
}
