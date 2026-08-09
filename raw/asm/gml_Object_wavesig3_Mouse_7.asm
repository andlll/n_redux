// gml_Object_wavesig3_Mouse_7  locals=2 args=0 len=932
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
00000048: bf 0x20B7960
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v phase
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B7824
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 649
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
000000DC: b 0x20B7960
000000E0: push.imm.e 455
000000E4: pushenv 0x20B7868
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.v night
00000100: call action_if_variable(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20B7868
00000120: b 0x20B7870
00000124: popenv 0x40B782C
00000128: b 0x20B7874
0000012C: popenv 0x1CB7870
00000130: push.local.v local.__b__
00000138: conv.v.b
0000013C: bf 0x20B7960
00000140: push.imm.e 156
00000144: pushenv 0x20B78C8
00000148: push.imm.e 4
0000014C: conv.i.v
00000150: push.imm.e 50
00000154: conv.i.v
00000158: push.v crys
00000160: call action_if_variable(argc=3)
00000168: pop.v.v local.__b__
00000170: push.local.v local.__b__
00000178: conv.v.b
0000017C: bf 0x20B78C8
00000180: b 0x20B78D0
00000184: popenv 0x40B788C
00000188: b 0x20B78D4
0000018C: popenv 0x1CB78D0
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20B7960
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.v obj106.y
000001BC: push.v obj106.x
000001C4: push.imm.e 103
000001C8: conv.i.v
000001CC: call action_create_object(argc=3)
000001D4: popz
000001D8: push.imm.e 1
000001DC: conv.i.v
000001E0: call action_set_relative(argc=1)
000001E8: popz
000001EC: push.imm.e 156
000001F0: pushenv 0x20B7950
000001F4: push.v crys
000001FC: push.imm.e -50
00000200: add.i.v
00000204: pop.v.v crys
0000020C: popenv 0x40B7938
00000210: call action_kill_object(argc=0)
00000218: popz
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.builtin.v os_type
00000234: call action_if_variable(argc=3)
0000023C: pop.v.v local.__b__
00000244: push.local.v local.__b__
0000024C: conv.v.b
00000250: bf 0x20B7AD4
00000254: push.imm.e 455
00000258: pushenv 0x20B79DC
0000025C: push.imm.e 0
00000260: conv.i.v
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: push.v night
00000274: call action_if_variable(argc=3)
0000027C: pop.v.v local.__b__
00000284: push.local.v local.__b__
0000028C: conv.v.b
00000290: bf 0x20B79DC
00000294: b 0x20B79E4
00000298: popenv 0x40B79A0
0000029C: b 0x20B79E8
000002A0: popenv 0x1CB79E4
000002A4: push.local.v local.__b__
000002AC: conv.v.b
000002B0: bf 0x20B7AD4
000002B4: push.imm.e 156
000002B8: pushenv 0x20B7A3C
000002BC: push.imm.e 4
000002C0: conv.i.v
000002C4: push.imm.e 50
000002C8: conv.i.v
000002CC: push.v crys
000002D4: call action_if_variable(argc=3)
000002DC: pop.v.v local.__b__
000002E4: push.local.v local.__b__
000002EC: conv.v.b
000002F0: bf 0x20B7A3C
000002F4: b 0x20B7A44
000002F8: popenv 0x40B7A00
000002FC: b 0x20B7A48
00000300: popenv 0x1CB7A44
00000304: push.local.v local.__b__
0000030C: conv.v.b
00000310: bf 0x20B7AD4
00000314: push.imm.e 0
00000318: conv.i.v
0000031C: call action_set_relative(argc=1)
00000324: popz
00000328: push.v obj106.y
00000330: push.v obj106.x
00000338: push.imm.e 103
0000033C: conv.i.v
00000340: call action_create_object(argc=3)
00000348: popz
0000034C: push.imm.e 1
00000350: conv.i.v
00000354: call action_set_relative(argc=1)
0000035C: popz
00000360: push.imm.e 156
00000364: pushenv 0x20B7AC4
00000368: push.v crys
00000370: push.imm.e -50
00000374: add.i.v
00000378: pop.v.v crys
00000380: popenv 0x40B7AAC
00000384: call action_kill_object(argc=0)
0000038C: popz
00000390: push.imm.e 0
00000394: conv.i.v
00000398: call action_set_relative(argc=1)
000003A0: popz