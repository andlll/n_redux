// gml_Object_impa4rd_demo_Create_0  locals=2 args=0 len=752
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x21D55C8
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21D55C8
00000054: b 0x21D55D0
00000058: popenv 0x41D558C
0000005C: b 0x21D55D4
00000060: popenv 0x1DD55D0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21D5604
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x21D5648
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x21D5648
000000D4: b 0x21D5650
000000D8: popenv 0x41D560C
000000DC: b 0x21D5654
000000E0: popenv 0x1DD5650
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x21D5684
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.v y
0000011C: neg.v.d
00000120: push.d 3.1
0000012C: add.d.v
00000130: pop.v.v depth
00000138: push.imm.e 0
0000013C: pop.v.i tic
00000144: push.imm.e 2
00000148: conv.i.v
0000014C: call action_if_dice(argc=1)
00000154: pop.v.v local.__b__
0000015C: push.local.v local.__b__
00000164: conv.v.b
00000168: bf 0x21D5754
0000016C: push.imm.e 2
00000170: conv.i.v
00000174: call action_if_dice(argc=1)
0000017C: pop.v.v local.__b__
00000184: push.local.v local.__b__
0000018C: conv.v.b
00000190: bf 0x21D572C
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: push.imm.e 1151
000001A8: conv.i.v
000001AC: call action_sprite_set(argc=3)
000001B4: popz
000001B8: b 0x21D5750
000001BC: push.imm.e 1
000001C0: conv.i.v
000001C4: push.imm.e 0
000001C8: conv.i.v
000001CC: push.imm.e 1152
000001D0: conv.i.v
000001D4: call action_sprite_set(argc=3)
000001DC: popz
000001E0: b 0x21D57C8
000001E4: push.imm.e 2
000001E8: conv.i.v
000001EC: call action_if_dice(argc=1)
000001F4: pop.v.v local.__b__
000001FC: push.local.v local.__b__
00000204: conv.v.b
00000208: bf 0x21D57A4
0000020C: push.imm.e 1
00000210: conv.i.v
00000214: push.imm.e 0
00000218: conv.i.v
0000021C: push.imm.e 1153
00000220: conv.i.v
00000224: call action_sprite_set(argc=3)
0000022C: popz
00000230: b 0x21D57C8
00000234: push.imm.e 1
00000238: conv.i.v
0000023C: push.imm.e 0
00000240: conv.i.v
00000244: push.imm.e 1154
00000248: conv.i.v
0000024C: call action_sprite_set(argc=3)
00000254: popz
00000258: push.imm.e 0
0000025C: conv.i.v
00000260: push.imm.e 30
00000264: conv.i.v
00000268: call action_set_alarm(argc=2)
00000270: popz
00000274: push.imm.e 10
00000278: conv.i.v
0000027C: push.imm.e 20
00000280: conv.i.v
00000284: call action_set_alarm(argc=2)
0000028C: popz
00000290: push.imm.e 1
00000294: conv.i.v
00000298: call action_set_relative(argc=1)
000002A0: popz
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.imm.e 595
000002B8: conv.i.v
000002BC: call action_create_object(argc=3)
000002C4: popz
000002C8: push.imm.e 0
000002CC: conv.i.v
000002D0: call action_set_relative(argc=1)
000002D8: popz
000002DC: push.imm.e 0
000002E0: conv.i.v
000002E4: call action_set_relative(argc=1)
000002EC: popz