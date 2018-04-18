#Attr: Microblog by Nat Tuck

defmodule ImdbaeWeb.AuthController do
  use ImdbaeWeb, :controller

  alias Imdbae.Accounts

  def create(conn, %{"credentials" => user_credentials}) do
    case Accounts.get_and_auth_user(user_credentials["email"], user_credentials["password"]) do
      {:ok, user} ->
        conn
        |>put_status(:ok)
        |>render("authentication.json", user: user,
            token: Phoenix.Token.sign(ImdbaeWeb.Endpoint, Application.get_env(:imdbae, :app_salt), user.id))
      {:error, reason} ->
        conn
        |>put_status(:unauthorized)
        |>render("error.json", message: "Invalid credentials")
      _else ->
        conn
        |>put_status(:unauthorized)
        |>render("error.json", message: "Invalid credentials")
    end
  end
end

