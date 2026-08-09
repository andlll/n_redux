/// gml_Object_villa1_Create_0
// locals: __b__
action_set_relative(0);
redder = 0;
__b__ = action_if_dice(2);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(dvil2, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil2, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(dvil3, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil3, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(dvil4, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil4, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(dvil5, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil5, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil6, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil6, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil7, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil7, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil8, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil8, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil9, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil9, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil10, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil10, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil11, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil11, 0, 1);
            }
        }
    }
} else {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(dvil12, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil12, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(dvil1, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil1, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(dvil2, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil2, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(dvil3, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(vil3, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil4, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil4, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil5, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil5, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil6, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil6, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil7, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil7, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(dvil8, 0, 0);
                action_set_relative(0);
                action_sprite_set(vil8, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(dvil1, 0, 0);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(1);
action_create_object(pplo, 0, 0);
action_set_relative(0);
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
action_set_alarm(2000, 2);
action_set_alarm(600, 4);
action_set_alarm(57, 5);
action_set_alarm(120, 3);
action_set_alarm(240, 6);
ava = 0;
de = 0;
life = 100;
di = 0;
with (r12) {
    action_set_relative(1);
    wewe = wewe + 10;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    pop = pop + 2;
    action_set_relative(0);
}
depth = -y;
action_set_relative(0);
