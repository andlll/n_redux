/// gml_Object_lasergun_Step_0
// locals: __b__
action_set_relative(1);
__b__ = action_if_number(15, 0, 2);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(veicoli_target), 800, 1);
    if (__b__) {
        __b__ = action_if_variable(islas, 0, 0);
        if (__b__) {
            direttorio = point_direction(x, y, instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y);
            if (direttorio <= 22.5) {
                sprite_index = 194;
            }
            if (direttorio > 22.5) {
                if (direttorio <= 45) {
                    sprite_index = 195;
                }
            }
            if (direttorio > 45) {
                if (direttorio <= 67.5) {
                    sprite_index = 196;
                }
            }
            if (direttorio > 67.5) {
                if (direttorio <= 90) {
                    sprite_index = 197;
                }
            }
            if (direttorio > 90) {
                if (direttorio <= 112.5) {
                    sprite_index = 198;
                }
            }
            if (direttorio > 112.5) {
                if (direttorio <= 135) {
                    sprite_index = 199;
                }
            }
            if (direttorio > 135) {
                if (direttorio <= 157.5) {
                    sprite_index = 200;
                }
            }
            if (direttorio > 157.5) {
                if (direttorio <= 180) {
                    sprite_index = 201;
                }
            }
            if (direttorio > 180) {
                if (direttorio <= 202.5) {
                    sprite_index = 202;
                }
            }
            if (direttorio > 202.5) {
                if (direttorio <= 225) {
                    sprite_index = 203;
                }
            }
            if (direttorio > 225) {
                if (direttorio <= 247.5) {
                    sprite_index = 204;
                }
            }
            if (direttorio > 247.5) {
                if (direttorio <= 270) {
                    sprite_index = 205;
                }
            }
            if (direttorio > 270) {
                if (direttorio <= 292.5) {
                    sprite_index = 206;
                }
            }
            if (direttorio > 292.5) {
                if (direttorio <= 315) {
                    sprite_index = 207;
                }
            }
            if (direttorio > 315) {
                if (direttorio <= 337.5) {
                    sprite_index = 192;
                }
            }
            if (direttorio > 337.5) {
                if (direttorio <= 360) {
                    sprite_index = 193;
                }
            }
        }
    }
}
__b__ = action_if_variable(life, 0, 3);
if (__b__) {
    action_create_object(ruin3, 0, 0);
    action_create_object(laserdeath, 0, 0);
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
__b__ = action_if_variable(ovr, 0, 0);
if (__b__) {
    __b__ = action_if_variable(distance_to_object(nemici_target), 200, 1);
    if (__b__) {
        __b__ = action_if_variable(launching, 0, 0);
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(ele, 200, 2);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                with (r12) {
                    ele = ele + -200;
                }
                action_set_relative(0);
                islas = 1;
                action_set_relative(1);
                action_set_relative(0);
                launching = 1;
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(40, 2);
                action_set_relative(1);
                action_set_relative(0);
                launching = 2;
                action_set_relative(1);
                action_set_relative(0);
                action_set_alarm(85, 1);
                action_set_relative(1);
                direttorio = point_direction(x, y, instance_nearest(x, y, veicoli_target).x, instance_nearest(x, y, veicoli_target).y);
                if (direttorio <= 22.5) {
                    instance_create(x + 81, y - 321, laserone);
                }
                if (direttorio > 22.5) {
                    if (direttorio <= 45) {
                        instance_create(x + 65, y - 335, laserone_retro);
                    }
                }
                if (direttorio > 45) {
                    if (direttorio <= 67.5) {
                        instance_create(x + 38, y - 344, laserone_retro);
                    }
                }
                if (direttorio > 67.5) {
                    if (direttorio <= 90) {
                        instance_create(x + 9, y - 354, laserone_retro);
                    }
                }
                if (direttorio > 90) {
                    if (direttorio <= 112.5) {
                        instance_create(x - 23, y - 355, laserone_retro);
                    }
                }
                if (direttorio > 112.5) {
                    if (direttorio <= 135) {
                        instance_create(x - 49, y - 343, laserone_retro);
                    }
                }
                if (direttorio > 135) {
                    if (direttorio <= 157.5) {
                        instance_create(x - 70, y - 331, laserone_retro);
                    }
                }
                if (direttorio > 157.5) {
                    if (direttorio <= 180) {
                        instance_create(x - 80, y - 315, laserone_retro);
                    }
                }
                if (direttorio > 180) {
                    if (direttorio <= 202.5) {
                        instance_create(x - 77, y - 298, laserone);
                    }
                }
                if (direttorio > 202.5) {
                    if (direttorio <= 225) {
                        instance_create(x - 65, y - 283, laserone);
                    }
                }
                if (direttorio > 225) {
                    if (direttorio <= 247.5) {
                        instance_create(x - 42, y - 268, laserone);
                    }
                }
                if (direttorio > 247.5) {
                    if (direttorio <= 270) {
                        instance_create(x - 6, y - 266, laserone);
                    }
                }
                if (direttorio > 270) {
                    if (direttorio <= 292.5) {
                        instance_create(x + 22, y - 267, laserone);
                    }
                }
                if (direttorio > 292.5) {
                    if (direttorio <= 315) {
                        instance_create(x + 52, y - 273, laserone);
                    }
                }
                if (direttorio > 315) {
                    if (direttorio <= 337.5) {
                        instance_create(x + 73, y - 288, laserone);
                    }
                }
                if (direttorio > 337.5) {
                    if (direttorio <= 360) {
                        instance_create(x + 82, y - 302, laserone);
                    }
                }
                with (qwe) {
                    action_kill_object();
                }
            }
        }
    }
}
action_set_relative(0);
