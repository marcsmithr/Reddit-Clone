from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    text = TextAreaField('text', validators=[DataRequired()])
    submit = SubmitField('submit')
