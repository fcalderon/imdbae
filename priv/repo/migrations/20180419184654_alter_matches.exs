defmodule Imdbae.Repo.Migrations.AlterMatches do
  use Ecto.Migration

  def change do
    alter table("matches") do
      add :first_user_id, references(:users, on_delete: :nothing)
      add :second_user_id, references(:users, on_delete: :nothing)
      add :matched_on_first_usermovie_id, references(:usermovies, on_delete: :nothing)
      add :matched_on_second_usermovie_id, references(:usermovies, on_delete: :nothing)
      add :matched_on_movie_id, :integer
      add :matched_on_movie_title, :string
      add :matched_on_movie_poster_url, :string

      remove :email1
      remove :email2
    end
  end
end
