/// gml_Object_casa1_Create_0
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
                    action_create_object(d154, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c154, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d153, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c153, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d112, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c112, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d113, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c113, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d114, 0, 0);
                action_set_relative(0);
                action_sprite_set(c114, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d121, 0, 0);
                action_set_relative(0);
                action_sprite_set(c121, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d122, 0, 0);
                action_set_relative(0);
                action_sprite_set(c122, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d123, 0, 0);
                action_set_relative(0);
                action_sprite_set(c123, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d124, 0, 0);
                action_set_relative(0);
                action_sprite_set(c124, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d131, 0, 0);
                action_set_relative(0);
                action_sprite_set(c131, 0, 1);
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
                    action_create_object(d152, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c152, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d151, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c151, 0, 1);
                }
            } else {
                __b__ = action_if_dice(2);
                if (__b__) {
                    action_set_relative(1);
                    action_create_object(d132, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c132, 0, 1);
                } else {
                    action_set_relative(1);
                    action_create_object(d133, 0, 0);
                    action_set_relative(0);
                    action_sprite_set(c133, 0, 1);
                }
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d134, 0, 0);
                action_set_relative(0);
                action_sprite_set(c134, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d141, 0, 0);
                action_set_relative(0);
                action_sprite_set(c141, 0, 1);
            }
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d142, 0, 0);
                action_set_relative(0);
                action_sprite_set(c142, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d143, 0, 0);
                action_set_relative(0);
                action_sprite_set(c143, 0, 1);
            }
        } else {
            __b__ = action_if_dice(2);
            if (__b__) {
                action_set_relative(1);
                action_create_object(d144, 0, 0);
                action_set_relative(0);
                action_sprite_set(c144, 0, 1);
            } else {
                action_set_relative(1);
                action_create_object(d111, 0, 0);
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
