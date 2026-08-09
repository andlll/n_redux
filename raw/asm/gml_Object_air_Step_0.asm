// gml_Object_air_Step_0  locals=2 args=0 len=752
// locals: arguments, __b__
00000000: push.imm.e 1
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
00000048: bf 0x20B0DA8
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v piro
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B0DA8
00000084: push.imm.e 2
00000088: conv.i.v
0000008C: call action_if_dice(argc=1)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20B0D78
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 0
000000B8: conv.i.v
000000BC: push.imm.e 606
000000C0: conv.i.v
000000C4: call action_create_object(argc=3)
000000CC: popz
000000D0: push.imm.e 0
000000D4: conv.i.v
000000D8: call action_set_relative(argc=1)
000000E0: popz
000000E4: push.imm.e 1
000000E8: pop.v.i piro
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: call action_set_relative(argc=1)
00000114: popz
00000118: push.imm.e 12
0000011C: conv.i.v
00000120: push.imm.e 300
00000124: conv.i.v
00000128: call action_set_motion(argc=2)
00000130: popz
00000134: push.imm.e 1
00000138: conv.i.v
0000013C: call action_set_relative(argc=1)
00000144: popz
00000148: push.v col
00000150: push.imm.e 0
00000154: cmp.i.v ==
00000158: bf 0x20B0C34
0000015C: push.imm.e 259
00000160: pop.v.i sprite_index
00000168: push.v col
00000170: push.imm.e 1
00000174: cmp.i.v ==
00000178: bf 0x20B0C54
0000017C: push.imm.e 256
00000180: pop.v.i sprite_index
00000188: push.v col
00000190: push.imm.e 2
00000194: cmp.i.v ==
00000198: bf 0x20B0C74
0000019C: push.imm.e 258
000001A0: pop.v.i sprite_index
000001A8: push.v col
000001B0: push.imm.e 3
000001B4: cmp.i.v ==
000001B8: bf 0x20B0C94
000001BC: push.imm.e 257
000001C0: pop.v.i sprite_index
000001C8: push.imm.e 0
000001CC: conv.i.v
000001D0: call action_set_relative(argc=1)
000001D8: popz
000001DC: push.imm.e 0
000001E0: pop.v.i desto
000001E8: push.imm.e 1
000001EC: conv.i.v
000001F0: call action_set_relative(argc=1)
000001F8: popz
000001FC: push.imm.e 0
00000200: conv.i.v
00000204: call action_set_relative(argc=1)
0000020C: popz
00000210: push.imm.e 1
00000214: conv.i.v
00000218: push.imm.e 30
0000021C: conv.i.v
00000220: call action_set_alarm(argc=2)
00000228: popz
0000022C: push.imm.e 1
00000230: conv.i.v
00000234: call action_set_relative(argc=1)
0000023C: popz
00000240: push.imm.e 0
00000244: conv.i.v
00000248: push.imm.e 0
0000024C: conv.i.v
00000250: push.imm.e 612
00000254: conv.i.v
00000258: call action_create_object(argc=3)
00000260: popz
00000264: push.imm.e 0
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.imm.e 6
0000027C: conv.i.v
00000280: push.imm.e 8
00000284: conv.i.v
00000288: call action_set_alarm(argc=2)
00000290: popz
00000294: push.imm.e 1
00000298: conv.i.v
0000029C: call action_set_relative(argc=1)
000002A4: popz
000002A8: b 0x20B0DA8
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.imm.e 0
000002B8: conv.i.v
000002BC: push.imm.e 606
000002C0: conv.i.v
000002C4: call action_create_object(argc=3)
000002CC: popz
000002D0: call action_kill_object(argc=0)
000002D8: popz
000002DC: push.imm.e 0
000002E0: conv.i.v
000002E4: call action_set_relative(argc=1)
000002EC: popz