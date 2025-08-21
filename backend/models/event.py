from lib.model import Model
from lib.field import Field, FieldId
from lib.utils import create_slug
from models.metadata import MetaData
from models.location import Location

class Event(Model):
	title = Field()
	slug = Field()
	start = Field(required=False)
	end = Field(required=False)
	location = FieldId(model=Location, required=False)
	meta = FieldId(model=MetaData, required=False)

	def generate_slug(self) -> None:
		slug = create_slug(self.title)
		if self.contains(slug=slug):
			count = 1
			while True:
				new_slug = '-'.join([slug, str(count)])
				if not self.contains(slug=new_slug): 
					slug = new_slug
					break
				count = count + 1
		self._update_value('slug', slug)