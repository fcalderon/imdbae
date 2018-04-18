defmodule ImdbaeWeb.PageController do
  use ImdbaeWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def chat(conn, _params) do
    render conn, "chat.html"
  end

  def movies(conn, _params) do
    render conn, "movies.html"
  end
end
