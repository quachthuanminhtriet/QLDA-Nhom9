from django.core.management.base import BaseCommand
from products.models import Product, Category, Specification
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populate the database with product data'

    def handle(self, *args, **options):
        products_data = [
            {
                "name": "iPhone 15 Pro Max",
                "slug": "iphone-15-pro-max",
                "categories": [
                    {
                        "name": "Màn hình",
                        "specifications": [
                            {"label": "Kích thước màn hình", "value": "6.7 inches"},
                            {"label": "Công nghệ màn hình", "value": "Super Retina XDR OLED"},
                            {"label": "Độ phân giải màn hình", "value": "2796 x 1290-pixel"},
                            {"label": "Tính năng màn hình", "value": "Tốc độ làm mới 120Hz\n460 ppi\n2000 nits\nHDR\nTrue Tone\nDải màu rộng (P3)\nHaptic Touch\nTỷ lệ tương phản 2.000.000:1"},
                            {"label": "Tần số quét", "value": "120Hz"},
                            {"label": "Kiểu màn hình", "value": "Dynamic Island"},
                        ]
                    },
                    {
                        "name": "Camera sau",
                        "specifications": [
                            {"label": "Camera sau", "value": "Camera chính: 48MP, 24 mm, ƒ/1.78\nCamera góc siêu rộng: 12 MP, 13 mm, ƒ/2.2\nCamera Tele: 12 MP"},
                            {"label": "Quay video", "value": "4K@24/25/30/60 fps\nHD 1080p@25/30/60 fps\nHD 720p@30 fps"},
                            {"label": "Tính năng camera", "value": "Flash True Tone Thích Ứng\nPhotonic Engine\nDeep Fusion\nHDR thông minh thế hệ 5\nẢnh chân dung thế hệ mới với Focus và Depth Control\nHiệu ứng Chiếu Sáng Chân Dung với sáu chế độ\nChế độ Ban Đêm"},
                        ]
                    },
                    # Add other categories here...
                ]
            },
            {
                "name": "Samsung Galaxy Z Fold 6",
                "slug": "samsung-galaxy-z-fold-6",
                "categories": [
                    {
                        "name": "Màn hình",
                        "specifications": [
                            {"label": "Kích thước màn hình", "value": "7.6 inches (Unfolded), 6.2 inches (Cover)"},
                            {"label": "Công nghệ màn hình", "value": "Dynamic AMOLED 2X"},
                            {"label": "Độ phân giải màn hình", "value": "2208 x 1768 pixels (Unfolded), 2316 x 904 pixels (Cover)"},
                            {"label": "Tần số quét", "value": "120Hz"},
                        ]
                    },
                    # Add other categories for Samsung Galaxy Z Fold 6...
                ]
            }
        ]

        for product_data in products_data:
            product, _ = Product.objects.get_or_create(
                name=product_data["name"],
                slug=product_data["slug"]
            )

            for category_data in product_data["categories"]:
                category, _ = Category.objects.get_or_create(
                    name=category_data["name"],
                    product=product
                )

                for spec_data in category_data["specifications"]:
                    Specification.objects.get_or_create(
                        category=category,
                        label=spec_data["label"],
                        value=spec_data["value"]
                    )

        self.stdout.write(self.style.SUCCESS('Successfully populated product data'))
