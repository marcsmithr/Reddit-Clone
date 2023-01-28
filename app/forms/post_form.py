from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class PostForm(FlaskForm):
    # community_id = IntegerField('community_id', validators=[DataRequired()])
    title = TextAreaField('title', validators=[DataRequired()])
    text = TextAreaField('text')
    submit = SubmitField('submit')
