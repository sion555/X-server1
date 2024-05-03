const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                // 모델의 스키마
                userID: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    // unique: true // 한 사람이 여러 개의 포스트를 올릴 수 있으니 unique하면 안됨
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false
                }
            }, 
            {
                sequelize,
                timestamps: true,
                paranoid: true,
                modelName: 'Post',
                tableName: 'post'
            }
        )
    }
    static associate(db) {
        db.Post.belongsTo(db.User, { foreignKey: 'userID', sourceKey: 'userID' });
    }
}


module.exports = Post;