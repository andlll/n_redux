/// gml_Object_gatlinggun_Mouse_0
// locals: __b__
__b__ = action_if_number(15, 0, 2);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(veicoli_target), 550, 1);
    if (__b__) {
        __b__ = action_if_variable(launching, 1, 0);
        if (__b__) {
            direttorio = point_direction(x, y, instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y);
            spra = 1;
            launching = 0;
            amove = 1;
            alarm[11] = 3;
            alarm[6] = 6;
            if (direttorio <= 22.5) {
                sprite_index = 212;
                instance_create(x + 127, y - 123, gat_avant_des);
                instance_create(x + 128, y - 155, gat_avant_des);
                instance_create(x + 127, y - 123, yellow_pro);
                instance_create(x + 128, y - 155, yellow_pro);
            }
            if (direttorio > 22.5) {
                if (direttorio <= 45) {
                    sprite_index = 214;
                    instance_create(x + 124, y - 153, gat_diet_des);
                    instance_create(x + 106, y - 182, gat_diet_des);
                    instance_create(x + 124, y - 153, yellow_pro);
                    instance_create(x + 106, y - 182, yellow_pro);
                }
            }
            if (direttorio > 45) {
                if (direttorio <= 67.5) {
                    sprite_index = 216;
                    instance_create(x + 109, y - 184, gat_diet_des);
                    instance_create(x + 69, y - 202, gat_diet_des);
                    instance_create(x + 109, y - 184, yellow_pro);
                    instance_create(x + 69, y - 202, yellow_pro);
                }
            }
            if (direttorio > 67.5) {
                if (direttorio <= 90) {
                    sprite_index = 218;
                    instance_create(x + 74, y - 201, gat_diet_des);
                    instance_create(x + 26, y - 211, gat_diet_des);
                    instance_create(x + 74, y - 201, yellow_pro);
                    instance_create(x + 26, y - 211, yellow_pro);
                }
            }
            if (direttorio > 90) {
                if (direttorio <= 112.5) {
                    sprite_index = 220;
                    instance_create(x + 25, y - 213, gat_diet_des);
                    instance_create(x - 27, y - 213, gat_diet_des);
                    instance_create(x + 25, y - 213, yellow_pro);
                    instance_create(x - 27, y - 213, yellow_pro);
                }
            }
            if (direttorio > 112.5) {
                if (direttorio <= 135) {
                    sprite_index = 222;
                    instance_create(x - 25, y - 210, gat_diet_des);
                    instance_create(x - 75, y - 198, gat_diet_des);
                    instance_create(x - 25, y - 210, yellow_pro);
                    instance_create(x - 75, y - 198, yellow_pro);
                }
            }
            if (direttorio > 135) {
                if (direttorio <= 157.5) {
                    sprite_index = 224;
                    instance_create(x - 68, y - 169, gat_diet_des);
                    instance_create(x - 107, y - 175, gat_diet_des);
                    instance_create(x - 68, y - 169, yellow_pro);
                    instance_create(x - 107, y - 175, yellow_pro);
                }
            }
            if (direttorio > 157.5) {
                if (direttorio <= 180) {
                    sprite_index = 226;
                    instance_create(x - 104, y - 180, gat_diet_des);
                    instance_create(x - 125, y - 150, gat_diet_des);
                    instance_create(x - 104, y - 180, yellow_pro);
                    instance_create(x - 125, y - 180, yellow_pro);
                }
            }
            if (direttorio > 180) {
                if (direttorio <= 202.5) {
                    sprite_index = 228;
                    instance_create(x - 125, y - 157, gat_avant_des);
                    instance_create(x - 127, y - 122, gat_avant_des);
                    instance_create(x - 125, y - 157, yellow_pro);
                    instance_create(x - 127, y - 122, yellow_pro);
                }
            }
            if (direttorio > 202.5) {
                if (direttorio <= 225) {
                    sprite_index = 230;
                    instance_create(x - 128, y - 130, gat_avant_des);
                    instance_create(x - 107, y - 100, gat_avant_des);
                    instance_create(x - 128, y - 130, yellow_pro);
                    instance_create(x - 107, y - 100, yellow_pro);
                }
            }
            if (direttorio > 225) {
                if (direttorio <= 247.5) {
                    sprite_index = 232;
                    instance_create(x - 107, y - 105, gat_avant_des);
                    instance_create(x - 72, y - 81, gat_avant_des);
                    instance_create(x - 107, y - 105, yellow_pro);
                    instance_create(x - 72, y - 81, yellow_pro);
                }
            }
            if (direttorio > 247.5) {
                if (direttorio <= 270) {
                    sprite_index = 234;
                    instance_create(x - 74, y - 84, gat_avant_des);
                    instance_create(x - 27, y - 72, gat_avant_des);
                    instance_create(x - 74, y - 84, yellow_pro);
                    instance_create(x - 27, y - 72, yellow_pro);
                }
            }
            if (direttorio > 270) {
                if (direttorio <= 292.5) {
                    sprite_index = 236;
                    instance_create(x - 31, y - 74, gat_avant_des);
                    instance_create(x + 21, y - 76, gat_avant_des);
                    instance_create(x - 31, y - 74, yellow_pro);
                    instance_create(x + 21, y - 76, yellow_pro);
                }
            }
            if (direttorio > 292.5) {
                if (direttorio <= 315) {
                    sprite_index = 238;
                    instance_create(x + 19, y - 78, gat_avant_des);
                    instance_create(x + 68, y - 87, gat_avant_des);
                    instance_create(x + 19, y - 78, yellow_pro);
                    instance_create(x + 68, y - 87, yellow_pro);
                }
            }
            if (direttorio > 315) {
                if (direttorio <= 337.5) {
                    sprite_index = 208;
                    instance_create(x + 72, y - 76, gat_avant_des);
                    instance_create(x + 108, y - 95, gat_avant_des);
                    instance_create(x + 72, y - 76, yellow_pro);
                    instance_create(x + 108, y - 95, yellow_pro);
                }
            }
            if (direttorio > 337.5) {
                if (direttorio <= 360) {
                    sprite_index = 210;
                    instance_create(x + 104, y - 95, gat_avant_des);
                    instance_create(x + 126, y - 125, gat_avant_des);
                    instance_create(x + 104, y - 95, yellow_pro);
                    instance_create(x + 126, y - 125, yellow_pro);
                }
            }
            with (r12) {
                selec = 0;
            }
        }
    }
}
