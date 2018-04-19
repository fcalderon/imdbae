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

  #adapted from Serafeim Maroulis Phoenix API with React Native part 2
  def render("error.json", %{changeset: changeset}) do
    errors = Enum.map(changeset.errors, fn {attr, error} ->
      %{"#{attr}": format_error(error)}
    end)
    %{
      errors: errors
    }
    IO.inspect(errors)
  end

  defp format_error({message, values}) do
    Enum.reduce values, message, fn {k, v}, acc ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end
  end
end
