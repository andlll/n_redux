/// gml_Object_impa4f_demo_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    action_sprite_set(sf15, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 1, 0);
if (__b__) {
    action_sprite_set(sf16, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 2, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf21, 0, 1);
        } else {
            action_sprite_set(sf22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf23, 0, 1);
        } else {
            action_sprite_set(sf24, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 3, 0);
if (__b__) {
    action_sprite_set(sf25, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 4, 0);
if (__b__) {
    action_sprite_set(sf26, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 5, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf31, 0, 1);
        } else {
            action_sprite_set(sf32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf33, 0, 1);
        } else {
            action_sprite_set(sf34, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 6, 0);
if (__b__) {
    action_sprite_set(sf35, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    action_sprite_set(sf36, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 8, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf41, 0, 1);
        } else {
            action_sprite_set(sf42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf43, 0, 1);
        } else {
            action_sprite_set(sf44, 0, 1);
        }
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 9, 0);
if (__b__) {
    action_sprite_set(sf46, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 10, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(tops4s, 0, -170);
    action_set_relative(0);
    action_set_alarm(700, 5);
    action_set_alarm(800, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 11, 0);
if (__b__) {
    action_sprite_set(sf45, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 12, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf41, 0, 1);
        } else {
            action_sprite_set(sf42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf43, 0, 1);
        } else {
            action_sprite_set(sf44, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 13, 0);
if (__b__) {
    action_sprite_set(sf36, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 14, 0);
if (__b__) {
    action_sprite_set(sf35, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 15, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf31, 0, 1);
        } else {
            action_sprite_set(sf32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf33, 0, 1);
        } else {
            action_sprite_set(sf34, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 16, 0);
if (__b__) {
    action_sprite_set(sf26, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 17, 0);
if (__b__) {
    action_sprite_set(sf25, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 18, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf21, 0, 1);
        } else {
            action_sprite_set(sf22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf23, 0, 1);
        } else {
            action_sprite_set(sf24, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 19, 0);
if (__b__) {
    action_sprite_set(sf16, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 20, 0);
if (__b__) {
    action_sprite_set(sf15, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 21, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf11, 0, 1);
        } else {
            action_sprite_set(sf12, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sf13, 0, 1);
        } else {
            action_sprite_set(sf14, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 22, 0);
if (__b__) {
    action_kill_object();
}
action_set_relative(0);
