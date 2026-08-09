// gml_Object_honda_br2_Create_0  locals=2 args=0 len=616
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call action_if_dice(argc=1)
00000024: pop.v.v local.__b__
0000002C: push.local.v local.__b__
00000034: conv.v.b
00000038: bf 0x20A886C
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 56
00000050: conv.i.v
00000054: call action_create_object(argc=3)
0000005C: popz
00000060: call action_kill_object(argc=0)
00000068: popz
0000006C: push.imm.e 3
00000070: conv.i.v
00000074: call action_if_dice(argc=1)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20A88C4
00000094: push.imm.e 0
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 57
000000A8: conv.i.v
000000AC: call action_create_object(argc=3)
000000B4: popz
000000B8: call action_kill_object(argc=0)
000000C0: popz
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz
000000D8: push.imm.e 1257
000000DC: conv.i.v
000000E0: push.imm.e 228
000000E4: conv.i.v
000000E8: call action_move_to(argc=2)
000000F0: popz
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: call action_set_relative(argc=1)
00000104: popz
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 205
00000128: conv.i.v
0000012C: call action_set_alarm(argc=2)
00000134: popz
00000138: push.imm.e 1
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: call action_set_relative(argc=1)
0000015C: popz
00000160: push.imm.e 1
00000164: conv.i.v
00000168: push.imm.e 224
0000016C: conv.i.v
00000170: call action_set_alarm(argc=2)
00000178: popz
0000017C: push.imm.e 1
00000180: conv.i.v
00000184: call action_set_relative(argc=1)
0000018C: popz
00000190: push.imm.e 0
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e 3
000001A8: conv.i.v
000001AC: push.imm.e 30
000001B0: conv.i.v
000001B4: call action_set_motion(argc=2)
000001BC: popz
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz
000001D4: push.imm.e 455
000001D8: pushenv 0x20A8A18
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: push.imm.e 1
000001E8: conv.i.v
000001EC: push.v night
000001F4: call action_if_variable(argc=3)
000001FC: pop.v.v local.__b__
00000204: push.local.v local.__b__
0000020C: conv.v.b
00000210: bf 0x20A8A18
00000214: b 0x20A8A20
00000218: popenv 0x40A89DC
0000021C: b 0x20A8A24
00000220: popenv 0x1CA8A20
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x20A8A54
00000234: push.imm.e 1
00000238: conv.i.v
0000023C: push.i 16366009
00000244: conv.i.v
00000248: call action_sprite_color(argc=2)
00000250: popz
00000254: push.imm.e 0
00000258: conv.i.v
0000025C: call action_set_relative(argc=1)
00000264: popz