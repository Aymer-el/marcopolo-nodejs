import StorySchema from '../schemas/story.schema.js'
import baseJson from '../../base_test.js'


export class StoryController {
    async getStories(query) {
        return baseJson.stories;
    }
}