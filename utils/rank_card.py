from PIL import Image, ImageDraw, ImageFont, ImageOps
import io
import requests

async def create_rank_card(user, level, xp):
    width, height = 600, 250
    bar_width = 450
    bar_height = 30
    xp_progress = xp / 100

    # Загружаем аватар пользователя
    avatar_size = 100
    response = requests.get(user.avatar.url)
    avatar = Image.open(io.BytesIO(response.content)).convert("RGBA")
    avatar = avatar.resize((avatar_size, avatar_size), Image.LANCZOS)
    mask = Image.new("L", (avatar_size, avatar_size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, avatar_size, avatar_size), fill=255)
    avatar = ImageOps.fit(avatar, (avatar_size, avatar_size))
    avatar.putalpha(mask)

    # Создаем градиентный фон
    img = Image.new("RGB", (width, height), (25, 25, 25))
    draw = ImageDraw.Draw(img)
    for i in range(height):
        r = int(30 + (i / height) * (50 - 30))
        g = int(30 + (i / height) * (100 - 30))
        b = int(50 + (i / height) * (200 - 50))
        draw.line([(0, i), (width, i)], fill=(r, g, b))

    # Загружаем шрифт
    try:
        font = ImageFont.truetype("arial.ttf", 28)
        font_small = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Отрисовка информации
    draw.text((150, 30), user.name, fill=(255, 255, 255), font=font)
    draw.text((150, 80), f"Уровень: {level}", fill=(255, 255, 255), font=font_small)
    draw.text((150, 110), f"XP: {xp}/100", fill=(200, 200, 200), font=font_small)

    # Прогресс-бар
    bar_x, bar_y = 150, 170
    draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_width, bar_y + bar_height], fill=(50, 50, 50), radius=15)
    draw.rounded_rectangle(
        [bar_x, bar_y, bar_x + int(bar_width * xp_progress), bar_y + bar_height],
        fill=(0, 200, 0), radius=15
    )

    # Вставляем аватар
    img.paste(avatar, (30, 30), avatar)

    # Сохранение в байтовый поток
    img_byte_array = io.BytesIO()
    img.save(img_byte_array, format="PNG")
    img_byte_array.seek(0)
    return img_byte_array
