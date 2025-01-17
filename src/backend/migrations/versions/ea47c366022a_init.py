"""Init

Revision ID: ea47c366022a
Revises: 
Create Date: 2025-01-13 15:17:19.146046

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ea47c366022a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('type', sa.Enum('CATEGORY', 'GENRE', name='categorytype'), server_default='CATEGORY', nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['categories.category_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('category_id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('avatar_url', sa.String(length=255), nullable=True),
    sa.Column('role', sa.Enum('USER', 'ADMIN', 'SUPERADMIN', name='userrole'), server_default='USER', nullable=False),
    sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', 'BANNED', name='userstatus'), server_default='ACTIVE', nullable=False),
    sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('stories',
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('slug', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('cover_image_url', sa.String(length=255), nullable=True),
    sa.Column('author_name', sa.String(length=100), nullable=False),
    sa.Column('status', sa.Enum('ONGOING', 'COMPLETED', 'DROPPED', name='storystatus'), server_default='ONGOING', nullable=False),
    sa.Column('view_count', sa.Integer(), server_default='0', nullable=False),
    sa.Column('rating_avg', sa.Numeric(precision=3, scale=2), server_default='0.0', nullable=False),
    sa.Column('total_chapters', sa.Integer(), server_default='0', nullable=False),
    sa.Column('report_count', sa.Integer(), server_default='0', nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('story_id'),
    sa.UniqueConstraint('slug')
    )
    op.create_table('chapters',
    sa.Column('chapter_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('chapter_number', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('view_count', sa.Integer(), server_default='0', nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('chapter_id')
    )
    op.create_table('favorites',
    sa.Column('favorite_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('favorite_id'),
    sa.UniqueConstraint('user_id', 'story_id', name='uq_user_story_favorite')
    )
    op.create_table('reports',
    sa.Column('report_id', sa.Integer(), nullable=False),
    sa.Column('reason', sa.Text(), nullable=False),
    sa.Column('status', sa.Enum('IN_PROGRESS', 'COMPLETED', name='reportstatus'), server_default='IN_PROGRESS', nullable=False),
    sa.Column('admin_note', sa.Text(), nullable=True),
    sa.Column('reporter_id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['reporter_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('report_id')
    )
    op.create_table('reviews',
    sa.Column('review_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.CheckConstraint('rating >= 1 AND rating <= 5', name='valid_rating'),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('review_id'),
    sa.UniqueConstraint('user_id', 'story_id', name='uq_user_story_review')
    )
    op.create_table('story_categories',
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.category_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('story_id', 'category_id')
    )
    op.create_table('comments',
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chapter_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['chapter_id'], ['chapters.chapter_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['parent_id'], ['comments.comment_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('comment_id')
    )
    op.create_table('reading_progress',
    sa.Column('progress_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('chapter_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['chapter_id'], ['chapters.chapter_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['story_id'], ['stories.story_id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('progress_id'),
    sa.UniqueConstraint('user_id', 'story_id', name='uq_user_story_progress')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reading_progress')
    op.drop_table('comments')
    op.drop_table('story_categories')
    op.drop_table('reviews')
    op.drop_table('reports')
    op.drop_table('favorites')
    op.drop_table('chapters')
    op.drop_table('stories')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
