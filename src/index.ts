import { getInput, setFailed } from '@actions/core';
import * as github from '@actions/github';
import { App } from '@slack/bolt';

async function sendMessageToChannel(app: any, message: string) {
    const temp = await app.client.chat.postMessage({
        channel: 'webhooks',
        text: message
    })
}

export async function run() {
    try {
        const {
            eventName,
            ref,
            actor,
            payload,
          } = github.context;
    
        const slackSignInSecret = getInput('slackSignInSecret');
    
        if(!slackSignInSecret) {
            throw new Error('Slack SignInSecret not provided')
        }

        const slackBotToken = getInput('slackBotToken');
    
        if(!slackBotToken) {
            throw new Error('Slack BotToken not provided')
        }
    
        let branch = ref.slice(11);
    
        if (payload.pull_request) {
            branch = payload.pull_request.head.ref;
        }
    
        const app = new App({
            signingSecret: slackSignInSecret,
            token: slackBotToken,
        });
    
        const message = `User ${actor} add new ${eventName} from ${branch} branch to main`
    
        await sendMessageToChannel(app, message);
    } catch (err) {
        console.log(err);
        setFailed(err as any);
    }
}

run();