/// gml_Object_r12_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(allerta, 0, 0);
if (__b__) {
    __b__ = action_if_variable(oil, 1000, 3);
    if (__b__) {
        action_create_object(alertalaert, 0, 0);
        allerta = 1;
    }
}
__b__ = action_if_variable(crys, 99, 2);
if (__b__) {
    crys = 99;
}
__b__ = action_if_variable(ele, -100, 1);
if (__b__) {
    ele = -100;
}
__b__ = action_if_variable(ele, 9999, 2);
if (__b__) {
    ele = 9999;
}
__b__ = action_if_variable(mon, 999998, 2);
if (__b__) {
    mon = 999999;
}
__b__ = action_if_variable(pop, 0, 1);
if (__b__) {
    pop = 0;
}
__b__ = action_if_number(736, 1, 0);
if (__b__) {
    __b__ = action_if_variable(oil, 0, 1);
    if (__b__) {
        oil = 0;
    }
}
with (chies) {
    __b__ = action_if_variable(level, 2, 1);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(oil, 20000, 4);
    if (__b__) {
        oil = 20000;
    }
}
with (chies) {
    __b__ = action_if_variable(level, 3, 1);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(oil, 30000, 4);
    if (__b__) {
        oil = 30000;
    }
}
with (chies) {
    __b__ = action_if_variable(level, 4, 1);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(oil, 50000, 4);
    if (__b__) {
        oil = 50000;
    }
}
__b__ = action_if_variable(bombolo, 4, 0);
if (__b__) {
    bombolo = 0;
    action_set_relative(1);
    bombus = bombus + 1;
    action_set_relative(0);
}
__b__ = action_if_variable(dirox, 10, 0);
if (__b__) {
    action_set_relative(1);
    diro = diro + 1;
    action_set_relative(0);
    dirox = 0;
}
__b__ = action_if_variable(arma, 0, 2);
if (__b__) {
    action_set_alarm(60, 4);
    action_set_alarm(200, 5);
    action_set_alarm(600, 6);
    arma = 0;
}
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    __b__ = action_if_number(291, 0, 0);
    if (__b__) {
        __b__ = action_if_variable(dara, 0, 0);
        if (__b__) {
            __b__ = action_if_variable(oil, 0, 3);
            if (__b__) {
                dara = 1;
                ele = -100;
                with (cddvd) {
                    action_kill_object();
                }
                with (lampla) {
                    action_kill_object();
                }
                with (object37) {
                    action_kill_object();
                }
                with (pplo) {
                    action_kill_object();
                }
                with (d111) {
                    action_kill_object();
                }
                with (d112) {
                    action_kill_object();
                }
                with (d114) {
                    action_kill_object();
                }
                with (d113) {
                    action_kill_object();
                }
                with (d121) {
                    action_kill_object();
                }
                with (d114) {
                    action_kill_object();
                }
                with (d123) {
                    action_kill_object();
                }
                with (d122) {
                    action_kill_object();
                }
                with (d124) {
                    action_kill_object();
                }
                with (d131) {
                    action_kill_object();
                }
                with (d132) {
                    action_kill_object();
                }
                with (d133) {
                    action_kill_object();
                }
                with (d134) {
                    action_kill_object();
                }
                with (d141) {
                    action_kill_object();
                }
                with (d142) {
                    action_kill_object();
                }
                with (d143) {
                    action_kill_object();
                }
                with (d144) {
                    action_kill_object();
                }
                with (d151) {
                    action_kill_object();
                }
                with (d152) {
                    action_kill_object();
                }
                with (d153) {
                    action_kill_object();
                }
                with (d154) {
                    action_kill_object();
                }
                with (di11) {
                    action_kill_object();
                }
                with (di21) {
                    action_kill_object();
                }
                with (di21) {
                    action_kill_object();
                }
                with (di22) {
                    action_kill_object();
                }
                with (di311) {
                    action_kill_object();
                }
                with (di312) {
                    action_kill_object();
                }
                with (di11b) {
                    action_kill_object();
                }
                with (di12b) {
                    action_kill_object();
                }
                with (di13b) {
                    action_kill_object();
                }
                with (di12b) {
                    action_kill_object();
                }
                with (di14b) {
                    action_kill_object();
                }
                with (i21bb) {
                    action_kill_object();
                }
                with (i21cc) {
                    action_kill_object();
                }
                with (i22bb) {
                    action_kill_object();
                }
                with (i22cc) {
                    action_kill_object();
                }
                with (i31aa1) {
                    action_kill_object();
                }
                with (i31aa2) {
                    action_kill_object();
                }
                with (i31aa3) {
                    action_kill_object();
                }
                with (di14) {
                    action_kill_object();
                }
                with (di12) {
                    action_kill_object();
                }
                with (cddvd) {
                    action_kill_object();
                }
                with (cddvd2) {
                    action_kill_object();
                }
                with (cddvd3) {
                    action_kill_object();
                }
                with (cddvd32) {
                    action_kill_object();
                }
                with (cddvd33) {
                    action_kill_object();
                }
                with (cddvd34) {
                    action_kill_object();
                }
                with (cddvd35) {
                    action_kill_object();
                }
                with (d211) {
                    action_kill_object();
                }
                with (d212) {
                    action_kill_object();
                }
                with (d213) {
                    action_kill_object();
                }
                with (d214) {
                    action_kill_object();
                }
                with (d221) {
                    action_kill_object();
                }
                with (d222) {
                    action_kill_object();
                }
                with (d223) {
                    action_kill_object();
                }
                with (d224) {
                    action_kill_object();
                }
                with (d231) {
                    action_kill_object();
                }
                with (d232) {
                    action_kill_object();
                }
                with (d233) {
                    action_kill_object();
                }
                with (d234) {
                    action_kill_object();
                }
                with (d241) {
                    action_kill_object();
                }
                with (d243) {
                    action_kill_object();
                }
                with (d242) {
                    action_kill_object();
                }
                with (d242) {
                    action_kill_object();
                }
                with (d244) {
                    action_kill_object();
                }
                with (d251) {
                    action_kill_object();
                }
                with (d252) {
                    action_kill_object();
                }
                with (d253) {
                    action_kill_object();
                }
                with (d254) {
                    action_kill_object();
                }
                with (d311) {
                    action_kill_object();
                }
                with (d312) {
                    action_kill_object();
                }
                with (d313) {
                    action_kill_object();
                }
                with (d314) {
                    action_kill_object();
                }
                with (d321) {
                    action_kill_object();
                }
                with (d322) {
                    action_kill_object();
                }
                with (d323) {
                    action_kill_object();
                }
                with (d324) {
                    action_kill_object();
                }
                with (d331) {
                    action_kill_object();
                }
                with (d332) {
                    action_kill_object();
                }
                with (d333) {
                    action_kill_object();
                }
                with (d334) {
                    action_kill_object();
                }
                with (d341) {
                    action_kill_object();
                }
                with (d342) {
                    action_kill_object();
                }
                with (d343) {
                    action_kill_object();
                }
                with (d344) {
                    action_kill_object();
                }
                with (d351) {
                    action_kill_object();
                }
                with (d352) {
                    action_kill_object();
                }
                with (d353) {
                    action_kill_object();
                }
                with (d354) {
                    action_kill_object();
                }
                with (d411) {
                    action_kill_object();
                }
                with (d412) {
                    action_kill_object();
                }
                with (d413) {
                    action_kill_object();
                }
                with (d414) {
                    action_kill_object();
                }
                with (d421) {
                    action_kill_object();
                }
                with (d422) {
                    action_kill_object();
                }
                with (d423) {
                    action_kill_object();
                }
                with (d424) {
                    action_kill_object();
                }
                with (d431) {
                    action_kill_object();
                }
                with (d432) {
                    action_kill_object();
                }
                with (d433) {
                    action_kill_object();
                }
                with (d434) {
                    action_kill_object();
                }
                with (d441) {
                    action_kill_object();
                }
                with (d442) {
                    action_kill_object();
                }
                with (d443) {
                    action_kill_object();
                }
                with (d444) {
                    action_kill_object();
                }
                with (d451) {
                    action_kill_object();
                }
                with (d452) {
                    action_kill_object();
                }
                with (d453) {
                    action_kill_object();
                }
                with (d454) {
                    action_kill_object();
                }
                with (d511) {
                    action_kill_object();
                }
                with (d512) {
                    action_kill_object();
                }
                with (d513) {
                    action_kill_object();
                }
                with (d514) {
                    action_kill_object();
                }
                with (d521) {
                    action_kill_object();
                }
                with (d514) {
                    action_kill_object();
                }
                with (d522) {
                    action_kill_object();
                }
                with (d523) {
                    action_kill_object();
                }
                with (d524) {
                    action_kill_object();
                }
                with (d531) {
                    action_kill_object();
                }
                with (d532) {
                    action_kill_object();
                }
                with (d533) {
                    action_kill_object();
                }
                with (d534) {
                    action_kill_object();
                }
                with (d541) {
                    action_kill_object();
                }
                with (d542) {
                    action_kill_object();
                }
                with (d543) {
                    action_kill_object();
                }
                with (d544) {
                    action_kill_object();
                }
                with (d551) {
                    action_kill_object();
                }
                with (d552) {
                    action_kill_object();
                }
                with (d553) {
                    action_kill_object();
                }
                with (d554) {
                    action_kill_object();
                }
                with (mlsign) {
                    action_kill_object();
                }
                with (sold30) {
                    action_kill_object();
                }
                with (sold29) {
                    action_kill_object();
                }
                with (sold28) {
                    action_kill_object();
                }
                with (sold27) {
                    action_kill_object();
                }
                with (sold26) {
                    action_kill_object();
                }
                with (sold25) {
                    action_kill_object();
                }
                with (sold24) {
                    action_kill_object();
                }
                with (sold23) {
                    action_kill_object();
                }
                with (sold22) {
                    action_kill_object();
                }
                with (sold21) {
                    action_kill_object();
                }
                with (sold20) {
                    action_kill_object();
                }
                with (sold19) {
                    action_kill_object();
                }
                with (sold18) {
                    action_kill_object();
                }
                with (sold17) {
                    action_kill_object();
                }
                with (sold16) {
                    action_kill_object();
                }
                with (sold15) {
                    action_kill_object();
                }
                with (sold14) {
                    action_kill_object();
                }
                with (sold13) {
                    action_kill_object();
                }
                with (sold12) {
                    action_kill_object();
                }
                with (sold11) {
                    action_kill_object();
                }
                with (sold10) {
                    action_kill_object();
                }
                with (upcrc23) {
                    action_kill_object();
                }
                with (upcrc12) {
                    action_kill_object();
                }
                with (upind23) {
                    action_kill_object();
                }
                with (upind12) {
                    action_kill_object();
                }
                with (upsign45d) {
                    action_kill_object();
                }
                with (upsign45s) {
                    action_kill_object();
                }
                with (upsign23) {
                    action_kill_object();
                }
                with (upsign12) {
                    action_kill_object();
                }
                with (sold9) {
                    action_kill_object();
                }
                with (sold8) {
                    action_kill_object();
                }
                with (sold6) {
                    action_kill_object();
                }
                with (sold5) {
                    action_kill_object();
                }
                with (sold7) {
                    action_kill_object();
                }
                with (sold4) {
                    action_kill_object();
                }
                with (sold3) {
                    action_kill_object();
                }
                with (sold2) {
                    action_kill_object();
                }
                with (sold1) {
                    action_kill_object();
                }
                with (honda9) {
                    action_kill_object();
                }
                with (honda8) {
                    action_kill_object();
                }
                with (honda7) {
                    action_kill_object();
                }
                with (honda6) {
                    action_kill_object();
                }
                with (honda5) {
                    action_kill_object();
                }
                with (honda4) {
                    action_kill_object();
                }
                with (honda3) {
                    action_kill_object();
                }
                with (honda2) {
                    action_kill_object();
                }
                with (honda1) {
                    action_kill_object();
                }
                with (playbuttoner) {
                    action_kill_object();
                }
                with (oilzero_target) {
                    action_kill_object();
                }
                with (notte_target) {
                    action_set_gravity(270, 0.04);
                }
                with (infame) {
                    action_set_gravity(270, 0.04);
                }
                with (r12) {
                    action_set_gravity(270, 0.04);
                }
                with (infame) {
                    action_set_gravity(270, 0.04);
                }
                with (casca_target) {
                    action_set_gravity(270, 0.04);
                }
            }
        }
    }
}
action_set_relative(0);
