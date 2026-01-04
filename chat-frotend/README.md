### Check  Topic 1: Introduction to LangGraph & State Management


## Practice Exercises
## Exercise 1: Build Your First Stateful Agent

**Difficulty:** Beginner
**Estimated Time:** 30-45 minutes


### Task
Build a simple customer support chatbot that remembers conversation context.

### Requirements
1. Create a StateGraph with MessagesState
2. Add a system prompt that makes the agent act as a helpful customer support rep
3. Use MemorySaver checkpointer for memory
4. Test with a multi-turn conversation where context matters

### Example Conversation
```
User: "I bought a laptop last week"
Agent: "I'd be happy to help with your laptop! What seems to be the issue?"
User: "It won't turn on"
Agent: "I understand your laptop won't turn on. Have you tried..."
```
