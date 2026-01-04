from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import SystemMessage, AIMessage
from langchain_openai import ChatOpenAI

from dotenv import load_dotenv
import os


load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.6,
    api_key=os.getenv("OPENAI_API_KEY")
)

system_prompt = SystemMessage(
    content=(
        "You are a helpful customer support assistant. "
        "You assist customers politely and help them resolve product issues."
    )
)

def assistant_node(state: MessagesState):
    messages = [system_prompt] + state.get("messages", [])
    response = llm.invoke(messages)
    return {"messages": [AIMessage(content=response.content)]}

builder = StateGraph(MessagesState)
builder.add_node("assistant", assistant_node)
builder.add_edge(START, "assistant")
builder.add_edge("assistant", END)

memory = MemorySaver()
agent = builder.compile(checkpointer=memory)
