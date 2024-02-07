import { getInput } from '@actions/core';
import * as github from '@actions/github';

export async function run() {
    const {
        eventName,
        sha,
        ref,
        actor,
        payload,
      } = github.context;

    const name = getInput('name');

    const branch = ref.slice(11);

    console.log('branch');
    console.log(branch);
    console.log('ref');
    console.log(ref);
    console.log('eventName');
    console.log(eventName);
    console.log('payload');
    console.log(payload);
    console.log('actor');
    console.log(actor);

    console.log(`Hello ${name}`);
}

run();