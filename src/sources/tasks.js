import loremIpsum from 'lorem-ipsum';
import { task } from '../structures/task';
import { assignees } from './assignees';

const assigneesIds = assignees.map(item => item.id);

export const tasks = [];

for (let i = 8; i > 0; i--) {
  tasks.push({
    ...task,
    id: i,
    name: loremIpsum(),
    text: loremIpsum({ count: 3 }),
    assigneeId: assigneesIds[Math.floor(Math.random() * assigneesIds.length)]
  });
}
