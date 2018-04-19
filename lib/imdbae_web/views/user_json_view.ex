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

  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    errors = %{errors: translate_errors(changeset)}
    IO.inspect(errors)
  end

end
