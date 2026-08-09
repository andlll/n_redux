/// gml_Object_laserone_Create_0
nocivo = 1;
depth = -y - 3500;
action_set_alarm(30, 0);
action_sprite_transform(2, 2, 0, 0);
image_angle = point_direction(x, y, instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y);
dat = 0;
ratt = 1;
