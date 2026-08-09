// gml_Object_bombar_Create_0  locals=2 args=0 len=628
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.d 3.5
00000020: pop.v.d life
00000028: push.imm.e 0
0000002C: pop.v.i piro
00000034: push.imm.e 2
00000038: conv.i.v
0000003C: call action_if_dice(argc=1)
00000044: pop.v.v local.__b__
0000004C: push.local.v local.__b__
00000054: conv.v.b
00000058: bf 0x20B0E38
0000005C: push.imm.e 8
00000060: conv.i.v
00000064: push.imm.e 30
00000068: conv.i.v
0000006C: call action_set_motion(argc=2)
00000074: popz
00000078: b 0x20B0E54
0000007C: push.imm.e 6
00000080: conv.i.v
00000084: push.imm.e 30
00000088: conv.i.v
0000008C: call action_set_motion(argc=2)
00000094: popz
00000098: push.imm.e -3990
0000009C: pop.v.i depth
000000A4: push.imm.e 1
000000A8: pop.v.i desto
000000B0: push.imm.e 455
000000B4: pushenv 0x20B0EB0
000000B8: push.imm.e 0
000000BC: conv.i.v
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.v night
000000D0: call action_if_variable(argc=3)
000000D8: pop.v.v local.__b__
000000E0: push.local.v local.__b__
000000E8: conv.v.b
000000EC: bf 0x20B0EB0
000000F0: b 0x20B0EB8
000000F4: popenv 0x40B0E74
000000F8: b 0x20B0EBC
000000FC: popenv 0x1CB0EB8
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20B0EEC
00000110: push.imm.e 1
00000114: conv.i.v
00000118: push.i 16366009
00000120: conv.i.v
00000124: call action_sprite_color(argc=2)
0000012C: popz
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 25
0000013C: conv.i.v
00000140: call action_set_alarm(argc=2)
00000148: popz
0000014C: push.imm.e 5
00000150: conv.i.v
00000154: push.imm.e 34
00000158: conv.i.v
0000015C: call action_set_alarm(argc=2)
00000164: popz
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: push.imm.e 6000
00000174: conv.i.v
00000178: call action_set_alarm(argc=2)
00000180: popz
00000184: push.imm.e 2
00000188: conv.i.v
0000018C: call action_if_dice(argc=1)
00000194: pop.v.v local.__b__
0000019C: push.local.v local.__b__
000001A4: conv.v.b
000001A8: bf 0x20B101C
000001AC: push.imm.e 2
000001B0: conv.i.v
000001B4: call action_if_dice(argc=1)
000001BC: pop.v.v local.__b__
000001C4: push.local.v local.__b__
000001CC: conv.v.b
000001D0: bf 0x20B0FD8
000001D4: push.imm.e 1
000001D8: conv.i.v
000001DC: call action_set_relative(argc=1)
000001E4: popz
000001E8: push.imm.e 0
000001EC: conv.i.v
000001F0: push.imm.e -330
000001F4: conv.i.v
000001F8: call action_move_to(argc=2)
00000200: popz
00000204: push.imm.e 0
00000208: conv.i.v
0000020C: call action_set_relative(argc=1)
00000214: popz
00000218: b 0x20B101C
0000021C: push.imm.e 1
00000220: conv.i.v
00000224: call action_set_relative(argc=1)
0000022C: popz
00000230: push.imm.e 0
00000234: conv.i.v
00000238: push.imm.e -434
0000023C: conv.i.v
00000240: call action_move_to(argc=2)
00000248: popz
0000024C: push.imm.e 0
00000250: conv.i.v
00000254: call action_set_relative(argc=1)
0000025C: popz
00000260: push.imm.e 0
00000264: conv.i.v
00000268: call action_set_relative(argc=1)
00000270: popz