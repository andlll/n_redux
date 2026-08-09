// gml_Object_wavesig1_Mouse_7  locals=2 args=0 len=1004
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.builtin.v os_type
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B72FC
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B719C
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 648
00000098: conv.i.v
0000009C: call action_create_object(argc=3)
000000A4: popz
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: call action_set_relative(argc=1)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i phase
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: b 0x20B72FC
000000E0: push.imm.e 455
000000E4: pushenv 0x20B71E0
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.v night
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20B71E0
00000120: b 0x20B71E8
00000124: popenv 0x40B71A4
00000128: b 0x20B71EC
0000012C: popenv 0x1CB71E8
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20B72FC
00000140: push.imm.e 156
00000144: pushenv 0x20B7240
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 20
00000154: conv.i.v
00000158: push.v crys
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20B7240
00000180: b 0x20B7248
00000184: popenv 0x40B7204
00000188: b 0x20B724C
0000018C: popenv 0x1CB7248
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20B72FC
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.v obj104.y
000001BC: push.v obj104.x
000001C4: push.imm.e 102
000001C8: conv.i.v
000001CC: call action_create_object(argc=3)
000001D4: popz
000001D8: push.imm.e 1
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.v obj105.y
000001F4: push.v obj105.x
000001FC: push.imm.e 102
00000200: conv.i.v
00000204: call action_create_object(argc=3)
0000020C: popz
00000210: push.imm.e 156
00000214: pushenv 0x20B72EC
00000218: push.v crys
00000220: push.imm.e -20
00000224: add.i.v
00000228: pop.v.v crys
00000230: popenv 0x40B72D4
00000234: call action_kill_object(argc=0)
0000023C: popz
00000240: push.imm.e 0
00000244: conv.i.v
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: push.builtin.v os_type
00000258: call action_if_variable(argc=3)
00000260: pop.v.v local.__b__
00000268: push.local.v local.__b__
00000270: conv.v.b
00000274: bf 0x20B7494
00000278: push.imm.e 455
0000027C: pushenv 0x20B7378
00000280: push.imm.e 0
00000284: conv.i.v
00000288: push.imm.e 1
0000028C: conv.i.v
00000290: push.v night
00000298: call action_if_variable(argc=3)
000002A0: pop.v.v local.__b__
000002A8: push.local.v local.__b__
000002B0: conv.v.b
000002B4: bf 0x20B7378
000002B8: b 0x20B7380
000002BC: popenv 0x40B733C
000002C0: b 0x20B7384
000002C4: popenv 0x1CB7380
000002C8: push.local.v local.__b__
000002D0: conv.v.b
000002D4: bf 0x20B7494
000002D8: push.imm.e 156
000002DC: pushenv 0x20B73D8
000002E0: push.imm.e 4
000002E4: conv.i.v
000002E8: push.imm.e 20
000002EC: conv.i.v
000002F0: push.v crys
000002F8: call action_if_variable(argc=3)
00000300: pop.v.v local.__b__
00000308: push.local.v local.__b__
00000310: conv.v.b
00000314: bf 0x20B73D8
00000318: b 0x20B73E0
0000031C: popenv 0x40B739C
00000320: b 0x20B73E4
00000324: popenv 0x1CB73E0
00000328: push.local.v local.__b__
00000330: conv.v.b
00000334: bf 0x20B7494
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: call action_set_relative(argc=1)
00000348: popz
0000034C: push.v obj104.y
00000354: push.v obj104.x
0000035C: push.imm.e 102
00000360: conv.i.v
00000364: call action_create_object(argc=3)
0000036C: popz
00000370: push.imm.e 1
00000374: conv.i.v
00000378: call action_set_relative(argc=1)
00000380: popz
00000384: push.v obj105.y
0000038C: push.v obj105.x
00000394: push.imm.e 102
00000398: conv.i.v
0000039C: call action_create_object(argc=3)
000003A4: popz
000003A8: push.imm.e 156
000003AC: pushenv 0x20B7484
000003B0: push.v crys
000003B8: push.imm.e -20
000003BC: add.i.v
000003C0: pop.v.v crys
000003C8: popenv 0x40B746C
000003CC: call action_kill_object(argc=0)
000003D4: popz
000003D8: push.imm.e 0
000003DC: conv.i.v
000003E0: call action_set_relative(argc=1)
000003E8: popz