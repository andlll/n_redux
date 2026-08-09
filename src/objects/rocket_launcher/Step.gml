/// gml_Object_rocket_launcher_Step_0
// locals: __b__, direttorio
action_set_relative(1);
__b__ = action_if_number(15, 0, 2);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(veicoli_target), 400, 1);
    if (__b__) {
        direttorio = point_direction(x, y, instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y);
        if (direttorio <= 22.5) {
            sprite_index = 242;
        }
        if (direttorio > 22.5) {
            if (direttorio <= 45) {
                sprite_index = 243;
            }
        }
        if (direttorio > 45) {
            if (direttorio <= 67.5) {
                sprite_index = 244;
            }
        }
        if (direttorio > 67.5) {
            if (direttorio <= 90) {
                sprite_index = 245;
            }
        }
        if (direttorio > 90) {
            if (direttorio <= 112.5) {
                sprite_index = 246;
            }
        }
        if (direttorio > 112.5) {
            if (direttorio <= 135) {
                sprite_index = 247;
            }
        }
        if (direttorio > 135) {
            if (direttorio <= 157.5) {
                sprite_index = 248;
            }
        }
        if (direttorio > 157.5) {
            if (direttorio <= 180) {
                sprite_index = 249;
            }
        }
        if (direttorio > 180) {
            if (direttorio <= 202.5) {
                sprite_index = 250;
            }
        }
        if (direttorio > 202.5) {
            if (direttorio <= 225) {
                sprite_index = 251;
            }
        }
        if (direttorio > 225) {
            if (direttorio <= 247.5) {
                sprite_index = 252;
            }
        }
        if (direttorio > 247.5) {
            if (direttorio <= 270) {
                sprite_index = 253;
            }
        }
        if (direttorio > 270) {
            if (direttorio <= 292.5) {
                sprite_index = 254;
            }
        }
        if (direttorio > 292.5) {
            if (direttorio <= 315) {
                sprite_index = 255;
            }
        }
        if (direttorio > 315) {
            if (direttorio <= 337.5) {
                sprite_index = 240;
            }
        }
        if (direttorio > 337.5) {
            if (direttorio <= 360) {
                sprite_index = 241;
            }
        }
    }
}
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    action_create_object(missilideath, 0, 0);
    action_create_object(ruin2, 0, 0);
    action_kill_object();
}
__b__ = action_if_number(127, 0, 0);
if (__b__) {
    __b__ = action_if_variable(redder, 1, 0);
    if (__b__) {
        with (aura) {
            __b__ = action_if_variable(night, 1, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_color(16366009, 1);
        }
        with (aura) {
            __b__ = action_if_variable(dawn, 1, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            action_sprite_color(15201023, 1);
        }
        with (aura) {
            __b__ = action_if_variable(dawn, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (aura) {
                __b__ = action_if_variable(night, 0, 0);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_sprite_color(16777215, 1);
            }
        }
        action_set_relative(0);
        redder = 0;
        action_set_relative(1);
    }
}
__b__ = action_if_number(127, 1, 0);
if (__b__) {
    __b__ = action_if_variable(redder, 1, 0);
    if (__b__) {
        action_sprite_color(255, 1);
    }
}
__b__ = action_if_number(15, 0, 2);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(nemici_target), 250, 1);
    if (__b__) {
        __b__ = action_if_variable(launching, 1, 0);
        if (__b__) {
            action_set_relative(0);
            launching = 0;
            action_set_relative(1);
            action_set_relative(0);
            action_set_alarm(40, 6);
            action_set_relative(1);
            if (direttorio <= 22.5) {
                instance_create(x + 46, y - 125, red_ball);
                instance_create(x + 46, y - 125, rol_avant);
            }
            if (direttorio > 22.5) {
                if (direttorio <= 45) {
                    instance_create(x + 27, y - 129, red_ball);
                    instance_create(x + 27, y - 129, rol_avant);
                }
            }
            if (direttorio > 45) {
                if (direttorio <= 67.5) {
                    instance_create(x + 6, y - 128, red_ball);
                    instance_create(x + 6, y - 128, rol_avant);
                }
            }
            if (direttorio > 67.5) {
                if (direttorio <= 90) {
                    instance_create(x - 15, y - 127, red_ball);
                    instance_create(x - 15, y - 127, rol_avant);
                }
            }
            if (direttorio > 90) {
                if (direttorio <= 112.5) {
                    instance_create(x - 34, y - 119, red_ball);
                    instance_create(x - 24, y - 119, rol_avant);
                }
            }
            if (direttorio > 112.5) {
                if (direttorio <= 135) {
                    instance_create(x - 46, y - 107, red_ball);
                    instance_create(x - 46, y - 107, rol_avant);
                }
            }
            if (direttorio > 135) {
                if (direttorio <= 157.5) {
                    instance_create(x - 55, y - 91, red_ball);
                    instance_create(x - 55, y - 91, rol_diet);
                }
            }
            if (direttorio > 157.5) {
                if (direttorio <= 180) {
                    instance_create(x - 51, y - 79, red_ball);
                    instance_create(x - 51, y - 79, rol_diet);
                }
            }
            if (direttorio > 180) {
                if (direttorio <= 202.5) {
                    instance_create(x - 44, y - 81, red_ball);
                    instance_create(x - 44, y - 81, rol_diet);
                }
            }
            if (direttorio > 202.5) {
                if (direttorio <= 225) {
                    instance_create(x - 30, y - 73, red_ball);
                    instance_create(x - 30, y - 73, rol_diet);
                }
            }
            if (direttorio > 225) {
                if (direttorio <= 247.5) {
                    instance_create(x - 11, y - 68, red_ball);
                    instance_create(x - 11, y - 68, rol_diet);
                }
            }
            if (direttorio > 247.5) {
                if (direttorio <= 270) {
                    instance_create(x + 9, y - 68, red_ball);
                    instance_create(x + 9, y - 68, rol_diet);
                }
            }
            if (direttorio > 270) {
                if (direttorio <= 292.5) {
                    instance_create(x + 29, y - 75, red_ball);
                    instance_create(x + 29, y - 75, rol_diet);
                }
            }
            if (direttorio > 292.5) {
                if (direttorio <= 315) {
                    instance_create(x + 43, y - 82, red_ball);
                    instance_create(x + 43, y - 82, rol_avant);
                }
            }
            if (direttorio > 315) {
                if (direttorio <= 337.5) {
                    instance_create(x + 64, y - 96, red_ball);
                    instance_create(x + 64, y - 96, rol_avant);
                }
            }
            if (direttorio > 337.5) {
                if (direttorio <= 360) {
                    instance_create(x + 60, y - 111, red_ball);
                    instance_create(x + 60, y - 111, rol_avant);
                }
            }
        }
    }
}
action_set_relative(0);
