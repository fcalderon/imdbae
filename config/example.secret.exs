use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :imdbae, ImdbaeWeb.Endpoint,
       secret_key_base: "<Secret_key>"

# Configure your database
config :imdbae,
       Imdbae.Repo,
       adapter: Ecto.Adapters.Postgres,
       username: "<db_username>",
       password: "<db_password>",
       database: "<db_name>",
       pool_size: 15


# You can use pwgen for this key
# e.g. $ pwgen 32 1 -s -y
config :imdbae, app_salt: "<put_secret_key_salt_here>"
config :google_maps,
       api_key: "AIzaSyD9ibjyQr-D535en8QPCgshM_Bl5dkClDY"