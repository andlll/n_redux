/// gml_Object_impa32f_Alarm_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(demos, 0, 0);
if (__b__) {
    action_set_alarm(24, 0);
    __b__ = action_if_variable(phase, 18, 0);
    if (__b__) {
        action_set_relative(1);
        action_create_object(impa33f, 67, -72);
        action_set_relative(0);
    }
    if (phase == 1) {
        sprite_index = 94;
        phase = phase + 1;
        exit;
    }
    if (phase == 2) {
        sprite_index = 92;
        phase = phase + 1;
        exit;
    }
    if (phase == 3) {
        sprite_index = 90;
        phase = phase + 1;
        exit;
    }
    if (phase == 4) {
        sprite_index = 88;
        phase = phase + 1;
        exit;
    }
    if (phase == 5) {
        sprite_index = 86;
        phase = phase + 1;
        exit;
    }
    if (phase == 6) {
        sprite_index = 84;
        phase = phase + 1;
        exit;
    }
    if (phase == 7) {
        sprite_index = 82;
        phase = phase + 1;
        exit;
    }
    if (phase == 8) {
        sprite_index = 80;
        phase = phase + 1;
        exit;
    }
    if (phase == 9) {
        sprite_index = 78;
        phase = phase + 1;
        exit;
    }
    if (phase == 10) {
        sprite_index = 76;
        phase = phase + 1;
        exit;
    }
    if (phase == 11) {
        sprite_index = 74;
        phase = phase + 1;
        exit;
    }
    if (phase == 12) {
        sprite_index = 72;
        phase = phase + 1;
        exit;
    }
    if (phase == 13) {
        sprite_index = 70;
        phase = phase + 1;
        exit;
    }
    if (phase == 14) {
        sprite_index = 68;
        phase = phase + 1;
        exit;
    }
    if (phase == 15) {
        sprite_index = 66;
        phase = phase + 1;
        exit;
    }
    if (phase == 16) {
        sprite_index = 64;
        phase = phase + 1;
        exit;
    }
    if (phase == 17) {
        sprite_index = 62;
        phase = phase + 1;
        exit;
    }
    if (phase == 18) {
        sprite_index = 60;
        phase = phase + 1;
        exit;
    }
    if (phase == 19) {
        sprite_index = 58;
        phase = phase + 1;
        exit;
    }
    if (phase == 20) {
        sprite_index = 56;
        phase = phase + 1;
        exit;
    }
    if (phase == 21) {
        sprite_index = 54;
        phase = phase + 1;
        exit;
    }
    if (phase == 22) {
        sprite_index = 52;
        phase = phase + 1;
        exit;
    }
    if (phase == 23) {
        sprite_index = 50;
        phase = phase + 1;
        exit;
    }
    if (phase == 24) {
        sprite_index = 48;
        phase = phase + 1;
        exit;
    }
    if (phase == 25) {
        sprite_index = 46;
        phase = phase + 1;
        exit;
    }
}
with (r12) {
    __b__ = action_if_variable(ele, -1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, -1000, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
    }
}
action_set_relative(0);
