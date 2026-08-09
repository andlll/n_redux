// gml_Object_dirig_Step_0  locals=2 args=0 len=844
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v life
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B22FC
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v piro
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B20B8
00000084: push.d 1.5
00000090: conv.d.v
00000094: push.imm.e -18
00000098: conv.i.v
0000009C: call action_set_motion(argc=2)
000000A4: popz
000000A8: push.imm.e 1
000000AC: conv.i.v
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e 1035
000000BC: conv.i.v
000000C0: call action_sprite_set(argc=3)
000000C8: popz
000000CC: push.imm.e 1
000000D0: pop.v.i piro
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.imm.e 85
000000E4: conv.i.v
000000E8: call action_set_alarm(argc=2)
000000F0: popz
000000F4: push.imm.e 45
000000F8: conv.i.v
000000FC: call action_if_dice(argc=1)
00000104: pop.v.v local.__b__
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x20B212C
0000011C: push.imm.e 1
00000120: conv.i.v
00000124: call action_set_relative(argc=1)
0000012C: popz
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: push.imm.e 606
00000144: conv.i.v
00000148: call action_create_object(argc=3)
00000150: popz
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: push.imm.e 45
0000016C: conv.i.v
00000170: call action_if_dice(argc=1)
00000178: pop.v.v local.__b__
00000180: push.local.v local.__b__
00000188: conv.v.b
0000018C: bf 0x20B21A0
00000190: push.imm.e 1
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e -30
000001A8: conv.i.v
000001AC: push.imm.e 90
000001B0: conv.i.v
000001B4: push.imm.e 606
000001B8: conv.i.v
000001BC: call action_create_object(argc=3)
000001C4: popz
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 45
000001E0: conv.i.v
000001E4: call action_if_dice(argc=1)
000001EC: pop.v.v local.__b__
000001F4: push.local.v local.__b__
000001FC: conv.v.b
00000200: bf 0x20B2214
00000204: push.imm.e 1
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: push.imm.e 30
0000021C: conv.i.v
00000220: push.imm.e -90
00000224: conv.i.v
00000228: push.imm.e 606
0000022C: conv.i.v
00000230: call action_create_object(argc=3)
00000238: popz
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: call action_set_relative(argc=1)
0000024C: popz
00000250: push.imm.e 45
00000254: conv.i.v
00000258: call action_if_dice(argc=1)
00000260: pop.v.v local.__b__
00000268: push.local.v local.__b__
00000270: conv.v.b
00000274: bf 0x20B2288
00000278: push.imm.e 1
0000027C: conv.i.v
00000280: call action_set_relative(argc=1)
00000288: popz
0000028C: push.imm.e 40
00000290: conv.i.v
00000294: push.imm.e -120
00000298: conv.i.v
0000029C: push.imm.e 606
000002A0: conv.i.v
000002A4: call action_create_object(argc=3)
000002AC: popz
000002B0: push.imm.e 0
000002B4: conv.i.v
000002B8: call action_set_relative(argc=1)
000002C0: popz
000002C4: push.imm.e 45
000002C8: conv.i.v
000002CC: call action_if_dice(argc=1)
000002D4: pop.v.v local.__b__
000002DC: push.local.v local.__b__
000002E4: conv.v.b
000002E8: bf 0x20B22FC
000002EC: push.imm.e 1
000002F0: conv.i.v
000002F4: call action_set_relative(argc=1)
000002FC: popz
00000300: push.imm.e -40
00000304: conv.i.v
00000308: push.imm.e 120
0000030C: conv.i.v
00000310: push.imm.e 606
00000314: conv.i.v
00000318: call action_create_object(argc=3)
00000320: popz
00000324: push.imm.e 0
00000328: conv.i.v
0000032C: call action_set_relative(argc=1)
00000334: popz
00000338: push.imm.e 0
0000033C: conv.i.v
00000340: call action_set_relative(argc=1)
00000348: popz