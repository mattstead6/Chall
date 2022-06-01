class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.string :actual_comment
      t.integer :post_id

      t.timestamps
    end
  end
end
