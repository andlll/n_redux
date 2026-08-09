/// gml_Object_pausania_Create_0
// locals: width, height
width = surface_get_width(application_surface);
height = surface_get_height(application_surface);
spr1 = 0;
spr1 = sprite_create_from_surface(application_surface, 0, 0, width, height, 0, 0, 0, 0);
instance_deactivate_all(1);
