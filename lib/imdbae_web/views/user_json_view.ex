defmodule ImdbaeWeb.UserJsonView do
  use ImdbaeWeb, :view
  alias ImdbaeWeb.UserJsonView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserJsonView, "user_json.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserJsonView, "user_json.json")}
  end

  def render("user_json.json", %{user_json: user}) do
    IO.inspect("Rendering USER!!!!")
    %{id: user.id,
      name: user.name,
      email: user.email}
  end

  def render("authentication.json", %{user: user, token: token}) do
    %{
      user: render("user_json.json",  user: user),
      token: token
    }
  end


  def render("error.json", %{message: message}) do
    %{
      error: message
    }
  end
end