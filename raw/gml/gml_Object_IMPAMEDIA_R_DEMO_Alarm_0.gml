/// gml_Object_IMPAMEDIA_R_DEMO_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(tic, 0, 0);
if (__b__) {
    action_sprite_set(sr15, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 1, 0);
if (__b__) {
    action_sprite_set(sr16, 0, 1);
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
            action_sprite_set(sr21, 0, 1);
        } else {
            action_sprite_set(sr22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr23, 0, 1);
        } else {
            action_sprite_set(sr24, 0, 1);
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
    action_set_relative(1);
    action_create_object(grubig, 80, 50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, 80, -50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, -12, -112);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, -80, 50);
    action_set_relative(0);
    action_set_relative(1);
    action_create_object(grubig, -172, -114);
    action_set_relative(0);
    action_sprite_set(sr25, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 4, 0);
if (__b__) {
    action_sprite_set(sr26, 0, 1);
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
            action_sprite_set(sr31, 0, 1);
        } else {
            action_sprite_set(sr32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr33, 0, 1);
        } else {
            action_sprite_set(sr34, 0, 1);
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
    action_sprite_set(sr35, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 7, 0);
if (__b__) {
    action_sprite_set(sr36, 0, 1);
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
            action_sprite_set(sr41, 0, 1);
        } else {
            action_sprite_set(sr42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr43, 0, 1);
        } else {
            action_sprite_set(sr44, 0, 1);
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
    action_sprite_set(sr45, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 10, 0);
if (__b__) {
    action_sprite_set(sr46, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 11, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr51, 0, 1);
    } else {
        action_sprite_set(sr52, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 12, 0);
if (__b__) {
    action_sprite_set(sr53, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 13, 0);
if (__b__) {
    action_sprite_set(sr54, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 14, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr61, 0, 1);
    } else {
        action_sprite_set(sr62, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 15, 0);
if (__b__) {
    action_sprite_set(sr63, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 16, 0);
if (__b__) {
    action_sprite_set(sr64, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 17, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr71, 0, 1);
    } else {
        action_sprite_set(sr72, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 18, 0);
if (__b__) {
    action_sprite_set(sr73, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 19, 0);
if (__b__) {
    action_sprite_set(sr74, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 20, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr82, 0, 1);
    } else {
        action_sprite_set(sr81, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 21, 0);
if (__b__) {
    action_sprite_set(sr83, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 22, 0);
if (__b__) {
    action_sprite_set(sr84, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 23, 0);
if (__b__) {
    action_set_relative(1);
    action_create_object(tops5s, 0, -340);
    action_set_relative(0);
    action_set_alarm(1200, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 24, 0);
if (__b__) {
    action_sprite_set(sr83, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 25, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr82, 0, 1);
    } else {
        action_sprite_set(sr81, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 26, 0);
if (__b__) {
    action_sprite_set(sr74, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 27, 0);
if (__b__) {
    action_sprite_set(sr73, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 28, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr71, 0, 1);
    } else {
        action_sprite_set(sr72, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 29, 0);
if (__b__) {
    action_sprite_set(sr64, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 30, 0);
if (__b__) {
    action_sprite_set(sr63, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 31, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr61, 0, 1);
    } else {
        action_sprite_set(sr62, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 32, 0);
if (__b__) {
    action_sprite_set(sr54, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 33, 0);
if (__b__) {
    action_sprite_set(sr53, 0, 1);
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 34, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        action_sprite_set(sr51, 0, 1);
    } else {
        action_sprite_set(sr52, 0, 1);
    }
    action_set_alarm(40, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 35, 0);
if (__b__) {
    action_sprite_set(sr45, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 36, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr41, 0, 1);
        } else {
            action_sprite_set(sr42, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr43, 0, 1);
        } else {
            action_sprite_set(sr44, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 37, 0);
if (__b__) {
    action_sprite_set(sr36, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 38, 0);
if (__b__) {
    action_sprite_set(sr35, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 39, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr31, 0, 1);
        } else {
            action_sprite_set(sr32, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr33, 0, 1);
        } else {
            action_sprite_set(sr34, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 40, 0);
if (__b__) {
    action_sprite_set(sr26, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 41, 0);
if (__b__) {
    action_sprite_set(sr25, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 42, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr21, 0, 1);
        } else {
            action_sprite_set(sr22, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr23, 0, 1);
        } else {
            action_sprite_set(sr24, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 43, 0);
if (__b__) {
    action_sprite_set(sr16, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 44, 0);
if (__b__) {
    action_sprite_set(sr15, 0, 1);
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 45, 0);
if (__b__) {
    __b__ = action_if_dice(2);
    if (__b__) {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr11, 0, 1);
        } else {
            action_sprite_set(sr12, 0, 1);
        }
    } else {
        __b__ = action_if_dice(2);
        if (__b__) {
            action_sprite_set(sr13, 0, 1);
        } else {
            action_sprite_set(sr14, 0, 1);
        }
    }
    action_set_alarm(20, 0);
    action_set_relative(1);
    tic = tic + 1;
    action_set_relative(0);
    action_set_relative(0);
    exit;
}
__b__ = action_if_variable(tic, 46, 0);
if (__b__) {
    action_kill_object();
}
action_set_relative(0);
