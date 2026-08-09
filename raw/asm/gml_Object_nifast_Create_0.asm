// gml_Object_nifast_Create_0  locals=2 args=0 len=400
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 2
00000018: conv.i.v
0000001C: call action_if_dice(argc=1)
00000024: pop.v.v local.__b__
0000002C: push.local.v local.__b__
00000034: conv.v.b
00000038: bf 0x213B150
0000003C: call action_kill_object(argc=0)
00000044: popz
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 1200
00000054: conv.i.v
00000058: call action_set_alarm(argc=2)
00000060: popz
00000064: push.imm.e -3990
00000068: pop.v.i depth
00000070: push.imm.e 20
00000074: pop.v.i depth
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 672
00000090: conv.i.v
00000094: call action_sprite_set(argc=3)
0000009C: popz
000000A0: push.imm.e -14
000000A4: conv.i.v
000000A8: push.imm.e -8
000000AC: conv.i.v
000000B0: call irandom_range(argc=2)
000000B8: push.imm.e 30
000000BC: conv.i.v
000000C0: call action_set_motion(argc=2)
000000C8: popz
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: call action_set_relative(argc=1)
000000DC: popz
000000E0: push.imm.e 100
000000E4: conv.i.v
000000E8: push.imm.e -100
000000EC: conv.i.v
000000F0: call irandom_range(argc=2)
000000F8: push.imm.e 300
000000FC: conv.i.v
00000100: push.imm.e 100
00000104: conv.i.v
00000108: call irandom_range(argc=2)
00000110: call action_move_to(argc=2)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: call action_set_relative(argc=1)
0000012C: popz
00000130: push.imm.e 2
00000134: conv.i.v
00000138: call action_if_dice(argc=1)
00000140: pop.v.v local.__b__
00000148: push.local.v local.__b__
00000150: conv.v.b
00000154: bf 0x213B284
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: push.imm.e 0
00000164: conv.i.v
00000168: push.imm.e 670
0000016C: conv.i.v
00000170: call action_sprite_set(argc=3)
00000178: popz
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: call action_set_relative(argc=1)
0000018C: popz