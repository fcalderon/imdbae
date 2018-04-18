#Attr: Microblog by Nat Tuck

defmodule ImdbaeWeb.SessionController do
  use ImdbaeWeb, :controller

  alias Imdbae.Accounts

  def create(conn, %{"email" => email, "password" => password}) do
    case Accounts.get_and_auth_user(email, password) do
      {:ok, user} ->
        conn
        |> put_session(:user_id, user.id)
        |> put_flash(:info, "Welcome back #{user.name}")
        |> redirect(to: page_path(conn, :movies))
      {:error, reason} ->
        conn
          |> put_flash(:error, reason)
          |> redirect(to: page_path(conn, :index))
      _else ->
        conn
          |> put_flash(:error, "Can't create session")
          |> redirect(to: page_path(conn, :index))
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end

