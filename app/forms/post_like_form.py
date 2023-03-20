from flask_wtf import FlaskForm
from wtforms import IntegerField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class PostLikeForm(FlaskForm):
    post_id = IntegerField('post_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    is_like = BooleanField('is_like', validators=[DataRequired()])
    submit = SubmitField('submit')
