defmodule ImdbaeWeb.AuthView do
  use ImdbaeWeb, :view
  alias ImdbaeWeb.AuthView

  def render("authentication.json", %{user: user, token: token}) do
    %{
      user: render("user.json",  user: user),
      token: token
    }
  end


  def render("error.json", %{message: message}) do
    %{
      error: message
    }
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      distance: user.distance,
      email: user.email}
  end
end
