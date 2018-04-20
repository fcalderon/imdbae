defmodule Imdbae.Repo.Migrations.AlterUsermovieAddPosterUrl do
  use Ecto.Migration

  def change do
    alter table("usermovies") do
      add :poster_url, :string
    end
  end
end
