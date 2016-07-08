''' generate static files from template partials '''

from jinja2 import Template
import json
import math
import re

# build index.html
index = Template(open('partials/header.html').read() +
                 open('partials/index.html').read() +
                 open('partials/footer.html').read() +
                 open('partials/app_footer.html').read())

index.stream(title='Vegan Tea Party Club',
             description='Tea parties are the best parties') \
            .dump('teaparty/index.html')

# build recipe pages
recipes = [
    'cashew_whipped_cream',
    'cauliflower_soup',
    'gingerbread_scones',
    'jam_tarts',
    'lemon_ginger_scones',
    'lemon_shortbread_cookies',
    'pistachio_rosewater_cookies',
    'pumpkin_scones',
    'quick_jam',
    'vegan_butter',
    'vegan_lemon_curd'
]


recipe_index_data = []

# recipe pages
for recipe in recipes:
    data = json.load(open('../recipes/json/%s.json' % recipe))

    if not 'description' in data:
        data['description'] = data['title']

    recipe_index_data.append({'link': '%s.html' % recipe,
                              'text': data['title']})

    ingredients = data['ingredients']
    for (i, ingredient) in enumerate(ingredients):
        ingredient = re.sub(
            r'\{butter\}',
            '<a href="/recipe/vegan_butter.html">vegan butter</a>',
            ingredient)
        ingredient = re.sub(
            r'\{jam}',
            '<a href="/recipe/quick_jam.html">jam</a>',
            ingredient)
        ingredient = re.sub(r'[\{\}]', '', ingredient)
        ingredients[i] = ingredient
    halfway = int(math.ceil(len(ingredients)/2)) + 1
    data['ingredients'] = [ingredients[0:halfway], ingredients[halfway:]]

    page = Template(open('partials/header.html').read() +
                    open('partials/recipe.html').read() +
                    open('partials/footer.html').read() +
                    open('partials/page_footer.html').read())

    page.stream(title='%s - Vegan Tea Party Club' % data['title'],
                description=data['description'],
                recipe=data) \
               .dump('teaparty/recipe/%s.html' % recipe)


# recipe index
recipe_index = Template(open('partials/header.html').read() +
                        open('partials/recipe_index.html').read() +
                        open('partials/footer.html').read() +
                        open('partials/page_footer.html').read())

recipe_index.stream(title='Recipes - Vegan Tea Party Club',
                    description='Tea parties are the best parties',
                    recipes=recipe_index_data) \
                   .dump('teaparty/recipe/index.html')

