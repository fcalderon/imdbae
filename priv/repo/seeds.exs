# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Imdbae.Repo.insert!(%Imdbae.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Imdbae.Repo
  alias Imdbae.Accounts.User
  alias Imdbae.Social.Match

  def run do
    p = Comeonin.Argon2.hashpwsalt("thisisnotacommonpassword")

    Repo.delete_all(User)
    Repo.insert!(%User{email: "anna@gmail.com", name: "anna", password_hash: p})
    Repo.insert!(%User{email: "betty@gmail.com", name: "betty", password_hash: p})
    Repo.insert!(%User{email: "candace@gmail.com", name: "candace", password_hash: p})
    Repo.insert!(%User{email: "devin@gmail.com", name: "devin", password_hash: p})

    Repo.delete_all(Match)
    Repo.insert!(%Match{email1: "anna@gmail.com", email2: "betty@gmail.com"})
    Repo.insert!(%Match{email1: "betty@gmail.com", email2: "candace@gmail.com"})
    Repo.insert!(%Match{email1: "anna@gmail.com", email2: "candace@gmail.com"})

  end
end

Seeds.run
