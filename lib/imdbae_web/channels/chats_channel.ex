defmodule ImdbaeWeb.ChatsChannel do
  use ImdbaeWeb, :channel
  alias Imdbae.Social
  alias Social.Match

  def join("chats:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  #allows user to join channel to chat with matches
  def join("chats:" <> match_name, _params, socket) do
    {:ok, socket}
  end


  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chats:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("message:new", %{"user" => user, "message" => msg}, socket) do
    broadcast! socket, "message:new", %{user: user,
                                        message: msg}
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
