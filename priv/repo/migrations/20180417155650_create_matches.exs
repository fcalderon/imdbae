defmodule Imdbae.Repo.Migrations.CreateMatches do
  use Ecto.Migration

  def change do
    create table(:matches) do
      add :email1, :string, null: false
      add :email2, :string, null: false

      timestamps()
    end

  end
end
