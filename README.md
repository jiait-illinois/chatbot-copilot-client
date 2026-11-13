# chatbot-copilot-client
Contains template code that can be added to a website to integrate with Copilot Studio. University branded and vetted for accessibility.

This was generated as part of the IT ProForum 2026 presentation. Links are at:

* https://itproforum.illinois.edu/eventdesc/1-spring-2026/1-1pm/from-idea-to-agent-building-your-first-chatbot-with-copilot-studio/
* https://go.illinois.edu/itpf2026-resources

## Files in /src directory

**Note that this is only for Standard Agents, see GitHub Copilot versus Standard Agents addendum below**

* index.html: template that has the chatbot information
* chatbot.js: JavaScript that contains chatbot connection information
* chatbot.css: CSS style that contains chatbot styling

## How to set up

Your HTML file needs needs to have the following in the head tag:
```
    <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
    <script src="//cdn.toolkit.illinois.edu/illinois-webchat/latest/chatbot.js"></script>
    <link rel="stylesheet" href="//cdn.toolkit.illinois.edu/illinois-webchat/latest/chatbot.css"></script>
```

Then in the body where you want the button, add this:
```
<div id="illinois-webchat" role="none"
     data-endpoint="[insert endpoint]"
     data-title=""
     data-bot-image=""
     data-user-image=""
     data-message=""></div>
```

You get the endpoint by going to Copilot Studio Agent and choosing Channels --> Email. Copy the token endpoint for this. 

![Screenshot of the email section of the Copilot Studio](image.png)

Put this endpoint in the `data-endpoint` attribute in the `<div>` tag. 

For `data-title`, put the name of the chatbot. It will default to "Chatbot". 

For `data-bot-image` and `data-user-image` attributes, you can include paths to images. If you delete these attributes, it will default to generic images.

For `data-message`, you can add a short message (for example, "Chat with us") that appears above the chat button until the chat is opened or the user dismisses it with the X. If it is blank or removed, no message is shown.

Example (note that we have a custom bot image but a default user image):
```
<div id="illinois-webchat" role="none"
     data-endpoint="https://default000000000000000000000000000000000.e3.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr29b_xxxxxx/directline/token?api-version=2022-03-01-preview"
     data-title="AI Assistant"
     data-bot-image="/img/bot.png"></div>
```

### Resources

* https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-webchat-overview?view=azure-bot-service-4.0 
* https://uofi.app.box.com/s/qa548vopkunb0aolpri0yb8uml5wu5d1 -- the campus Agent Blueprint Worksheet

## Activation

You can start the chatbot by calling `showChat()` on a button click. Note that when this starts, it will use a Copilot Credit, so only do this when the user wants to intiate a chat. Do not run this on `window.load()`.

### Copilot Licensing Links:

* https://azure.microsoft.com/en-us/pricing/details/copilot-studio/
* https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/copilot-capacity-packs 

## GitHub Copilot versus Standard Agents

Shortly after building this, Microsoft Copilot introduced the concept of "Powered By". The above is for Standard, but the default is (as of 9/30/2026) GitHub Copilot. You can check the difference by seeing the agent list. 

![Screenshot of the Standard vs. GitHub Copilot options](standard_vs_copilot.png)

The GitHub Copilot has fewer channels (https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/publication-channels-overview#web-and-app-channels), and you cannot deploy the agent with a native app token. Instead, you need to wrap the assigned webpage in an iframe. This means you do not have as much control over the interface. 

We have an example of this below. 

### Files with GitHub Copilot option

* index_copilot.html: template that has the chatbot information
* chatbot_copilot.js: JavaScript that contains chatbot connection information
* chatbot_copilot.css: CSS style that contains chatbot styling

index_copilot.html needs to have the following:

```
    <script src="//cdn.toolkit.illinois.edu/illinois-webchat/latest/chatbot_copilot.js"></script>
    <link rel="stylesheet" href="//cdn.toolkit.illinois.edu/illinois-webchat/latest/chatbot_copilot.css"></script>
    <script>
      generateEndpoint(' ** chatbot title ** ', ' ** chatbot web URL ** ', ' ** chatbot image ** ', ' ** chatbot message ** ');
    </script>
```

The chatbot title is whatever you want the title of the chatbot to be. 

You get the chatbot web URL by going to Copilot Studio Agent and choosing the arrow by the Publish Drodown. Go to the "Web app" and find the `<iframe src="...">`. Copy the item inside the `src` variable and put it as the chatbot web URL. Alternatively, you can just copy the "Demo website" -- the code will replace the "canvas" with "webchat" behind the scenes.

The chatbot image is optional. You can inject the HTML of the SVG, the image tag, or a font awesome HTML tag. If this is blank, then it will default to a standard SVG chatbot.

The chatbot message is optional. If set (for example, "Chat with us"), a small message appears above the chat button until the chat is opened or the user dismisses it with the X. If blank, no message is shown. 

### Activation with GitHub Copilot option

You can start the chatbot by calling `showChat()` on a button click. Note that when this starts, it will use a Copilot Credit, so only do this when the user wants to intiate a chat. Do not run this on `window.load()`.

## CSS Variables

We have some variables you can manipulate:

* --chat-heading-height: 65px;
* --chat-button-right: 104px;
* --chat-button-bottom: 32px;
* --chat-color: var(--il-blue);
* --chat-color-hover: var(--il-altgeld); 
* --chat-transition-speed: 0.3s;
