// gml_Object_honda_br1_Create_0  locals=2 args=0 len=720
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 736
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20A6EE0
0000004C: push.imm.e 852
00000050: conv.i.v
00000054: push.imm.e 1085
00000058: conv.i.v
0000005C: call action_move_to(argc=2)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 285
00000074: conv.i.v
00000078: call action_set_alarm(argc=2)
00000080: popz
00000084: push.imm.e 1
00000088: conv.i.v
0000008C: push.imm.e 304
00000090: conv.i.v
00000094: call action_set_alarm(argc=2)
0000009C: popz
000000A0: push.imm.e 3
000000A4: conv.i.v
000000A8: push.imm.e 210
000000AC: conv.i.v
000000B0: call action_set_motion(argc=2)
000000B8: popz
000000BC: push.imm.e 455
000000C0: pushenv 0x20A6F78
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.v night
000000DC: call action_if_variable(argc=3)
000000E4: pop.v.v local.__b__
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x20A6F78
000000FC: b 0x20A6F80
00000100: popenv 0x40A6F3C
00000104: b 0x20A6F84
00000108: popenv 0x1CA6F80
0000010C: push.local.v local.__b__
00000114: conv.v.b
00000118: bf 0x20A6FB4
0000011C: push.imm.e 1
00000120: conv.i.v
00000124: push.i 16366009
0000012C: conv.i.v
00000130: call action_sprite_color(argc=2)
00000138: popz
0000013C: push.imm.e 2
00000140: conv.i.v
00000144: call action_if_dice(argc=1)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x20A7034
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz
00000178: push.imm.e 0
0000017C: conv.i.v
00000180: push.imm.e 0
00000184: conv.i.v
00000188: push.imm.e 49
0000018C: conv.i.v
00000190: call action_create_object(argc=3)
00000198: popz
0000019C: push.imm.e 0
000001A0: conv.i.v
000001A4: call action_set_relative(argc=1)
000001AC: popz
000001B0: call action_kill_object(argc=0)
000001B8: popz
000001BC: push.imm.e 3
000001C0: conv.i.v
000001C4: call action_if_dice(argc=1)
000001CC: pop.v.v local.__b__
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20A70B4
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: call action_set_relative(argc=1)
000001F4: popz
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 0
00000204: conv.i.v
00000208: push.imm.e 50
0000020C: conv.i.v
00000210: call action_create_object(argc=3)
00000218: popz
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: call action_set_relative(argc=1)
0000022C: popz
00000230: call action_kill_object(argc=0)
00000238: popz
0000023C: push.imm.e 4
00000240: conv.i.v
00000244: call action_if_dice(argc=1)
0000024C: pop.v.v local.__b__
00000254: push.local.v local.__b__
0000025C: conv.v.b
00000260: bf 0x20A7134
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: push.imm.e 0
00000284: conv.i.v
00000288: push.imm.e 51
0000028C: conv.i.v
00000290: call action_create_object(argc=3)
00000298: popz
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: call action_set_relative(argc=1)
000002AC: popz
000002B0: call action_kill_object(argc=0)
000002B8: popz
000002BC: push.imm.e 0
000002C0: conv.i.v
000002C4: call action_set_relative(argc=1)
000002CC: popz